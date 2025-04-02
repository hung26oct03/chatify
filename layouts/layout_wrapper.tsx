import DefaultLayout from "./layout_default";
import VirtualLayout from "./layout_virtual";

const layouts = {
  default: DefaultLayout,
  virtual: VirtualLayout,
};

const LayoutWrapper = (props: any) => {
  const layout = props.children?.type?.layout;
  const Layout = layout;
  
  if (Layout) {
    return <Layout {...props}>{props.children}</Layout>;
  }
  
  return <DefaultLayout {...props}>{props.children}</DefaultLayout>;
};

export default LayoutWrapper;