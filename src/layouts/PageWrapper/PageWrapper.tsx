import React from "react";
import "./PageWrapper.css";

type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => (
  <div className="wrapper_container">{children}</div>
);

const defaultProps: Props = {
  children: <></>,
};

PageWrapper.defaultProps = defaultProps;

export default PageWrapper;
