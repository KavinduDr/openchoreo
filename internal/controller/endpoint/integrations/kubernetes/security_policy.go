// Copyright 2025 The OpenChoreo Authors
// SPDX-License-Identifier: Apache-2.0

package kubernetes

import (
	"context"
	"errors"

	egv1a1 "github.com/envoyproxy/gateway/api/v1alpha1"
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/client"
	gwapiv1 "sigs.k8s.io/gateway-api/apis/v1"
	gwapiv1a2 "sigs.k8s.io/gateway-api/apis/v1alpha2"

	"github.com/openchoreo/openchoreo/internal/controller/endpoint/integrations/kubernetes/visibility"
	"github.com/openchoreo/openchoreo/internal/dataplane"
)

type SecurityPolicyHandler struct {
	client     client.Client
	visibility visibility.VisibilityStrategy
}

var _ dataplane.ResourceHandler[dataplane.EndpointContext] = (*SecurityPolicyHandler)(nil)

func (h *SecurityPolicyHandler) Name() string {
	return "SecurityPolicy"
}

func (h *SecurityPolicyHandler) IsRequired(ctx *dataplane.EndpointContext) bool {
	return h.visibility.IsSecurityPolicyRequired(ctx)
}

func (h *SecurityPolicyHandler) GetCurrentState(ctx context.Context, epCtx *dataplane.EndpointContext) (interface{}, error) {
	namespace := makeNamespaceName(epCtx)
	name := makeHTTPRouteName(epCtx, h.visibility.GetGatewayType())
	out := &egv1a1.SecurityPolicy{}
	err := h.client.Get(ctx, client.ObjectKey{Name: name, Namespace: namespace}, out)
	if apierrors.IsNotFound(err) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return out, nil
}

func (h *SecurityPolicyHandler) Create(ctx context.Context, epCtx *dataplane.EndpointContext) error {
	securityPolicy := MakeSecurityPolicy(epCtx, h.visibility.GetGatewayType())
	return h.client.Create(ctx, securityPolicy)
}

func (h *SecurityPolicyHandler) Update(ctx context.Context, epCtx *dataplane.EndpointContext, currentState interface{}) error {
	current, ok := currentState.(*egv1a1.SecurityPolicy)
	if !ok {
		return errors.New("failed to cast current state to SecurityPolicy")
	}
	new := MakeSecurityPolicy(epCtx, h.visibility.GetGatewayType())
	if shouldUpdate(current, new) {
		new.ResourceVersion = current.ResourceVersion
		return h.client.Update(ctx, new)
	}
	return nil
}

func NewSecurityPolicyHandler(client client.Client, visibility visibility.VisibilityStrategy) dataplane.ResourceHandler[dataplane.EndpointContext] {
	return &SecurityPolicyHandler{
		client:     client,
		visibility: visibility,
	}
}

func (h *SecurityPolicyHandler) Delete(ctx context.Context, epCtx *dataplane.EndpointContext) error {
	return nil
}

func shouldUpdate(current, new *egv1a1.SecurityPolicy) bool {
	// Compare the labels
	if !cmp.Equal(extractManagedLabels(current.Labels), extractManagedLabels(new.Labels)) {
		return true
	}

	return !cmp.Equal(current.Spec, new.Spec, cmpopts.EquateEmpty())
}

func MakeSecurityPolicy(epCtx *dataplane.EndpointContext, gwType visibility.GatewayType) *egv1a1.SecurityPolicy {
	return &egv1a1.SecurityPolicy{
		ObjectMeta: metav1.ObjectMeta{
			Name:      makeHTTPRouteName(epCtx, gwType),
			Namespace: makeNamespaceName(epCtx),
			Labels:    makeWorkloadLabels(epCtx),
		},
		Spec: MakeSecurityPolicySpec(epCtx, gwType),
	}
}

func MakeSecurityPolicySpec(epCtx *dataplane.EndpointContext, gwType visibility.GatewayType) egv1a1.SecurityPolicySpec {
	return egv1a1.SecurityPolicySpec{
		JWT: &egv1a1.JWT{
			Providers: []egv1a1.JWTProvider{
				{
					Name: "default",
					RemoteJWKS: egv1a1.RemoteJWKS{
						URI: epCtx.Environment.Spec.Gateway.Security.RemoteJWKS.URI,
					},
				},
			},
		},
		PolicyTargetReferences: egv1a1.PolicyTargetReferences{
			TargetRefs: []gwapiv1a2.LocalPolicyTargetReferenceWithSectionName{
				{
					LocalPolicyTargetReference: gwapiv1a2.LocalPolicyTargetReference{
						Group: gwapiv1.GroupName,
						Kind:  gwapiv1.Kind("HTTPRoute"),
						Name:  gwapiv1a2.ObjectName(makeHTTPRouteName(epCtx, gwType)),
					},
				},
			},
		},
	}
}
