import { PageLayout } from '@open-choreo/common-views'
import {EnvCardBase} from '@open-choreo/resource-views'
import React from 'react'

export default function Deployment() {
  return (
    <PageLayout title='Deployments' testId='deployments-page'>
      <EnvCardBase envName='production' />
    </PageLayout>
  )
}
