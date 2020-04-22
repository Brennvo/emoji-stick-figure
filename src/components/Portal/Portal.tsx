import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const root = document.getElementById("portal");
const section = document.createElement("section");

type Props = {
  children: React.ReactNode;
};

const Portal = ({ children }: Props) => {
  useEffect(() => {
    root!.appendChild(section);
  }, []);

  return createPortal(children, section);
};

const defaultProps: Props = {
  children: <></>,
};

Portal.defaultProps = defaultProps;

export default Portal;
