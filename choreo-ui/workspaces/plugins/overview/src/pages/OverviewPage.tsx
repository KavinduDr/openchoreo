import { PageLayout, PresetErrorPage } from "@open-choreo/common-views";
import React from "react";

const OverviewPage: React.FC = () => {
  return (
    <PageLayout testId="overview-page" title="Overview">
      <PresetErrorPage preset="404" />
    </PageLayout>
  );
};

export default OverviewPage;
