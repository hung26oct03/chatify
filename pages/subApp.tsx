import React from "react";
import LayoutWrapper from "@/layouts/layout_wrapper";

interface SubAppProps {
  Component: React.ElementType;
  pageProps: any;
}

const SubApp: React.FC<SubAppProps> = ({ Component, pageProps }) => {
  if (!Component) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutWrapper {...pageProps}>
      <Component {...pageProps} />
    </LayoutWrapper>
  );
};

export default SubApp;