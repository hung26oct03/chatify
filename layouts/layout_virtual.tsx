import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const LayoutVirtual: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default LayoutVirtual;