import React from "react";
import "./Modal.scss";
import Portal from "../Portal";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ isOpen, children }: Props) => (
  <Portal>{isOpen && <div className="modal">{children}</div>}</Portal>
);

const defaultProps: Props = {
  isOpen: false,
  children: <></>,
};

Modal.defaultProps = defaultProps;

export default Modal;
