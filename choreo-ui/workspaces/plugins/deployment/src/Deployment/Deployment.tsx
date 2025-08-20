import React from "react";
import { PageLayout } from "@open-choreo/common-views";
import { EnvCardBase } from "@open-choreo/resource-views";

export default function Deployment() {
  return (
    <PageLayout title="Deployments" testId="deployments-page">
      <EnvCardBase envName="production" />
    </PageLayout>
  );
}
