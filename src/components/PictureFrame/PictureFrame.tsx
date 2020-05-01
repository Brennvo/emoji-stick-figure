import React, { useRef, useState } from "react";
import "./PictureFrame.scss";
import { Avatar } from "../../interfaces/Avatar.interface";
import AvatarCreation from "../AvatarCreation";

type Props = {
  avatar: Avatar;
  onFrameClose: () => void;
};

const PictureFrame = ({ avatar, onFrameClose }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ref && ref.current) {
      setIsCopied(true);
      ref.current.hidden = false;
      ref.current.select();
      document.execCommand("copy");
      ref.current.hidden = true;
    }
  };

  return (
    <div className="frame">
      <div className="frame__photo">
        <AvatarCreation avatar={avatar} />
        <button className="frame__photo__copy-btn" onClick={copyToClipboard}>
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </button>
        <button className="frame__photo__close" onClick={onFrameClose}>
          X
        </button>
      </div>
      <textarea readOnly ref={ref} hidden value={avatar.toString()} />
    </div>
  );
};
const defualtProps: Props = {
  avatar: { name: "", face: "", hat: "", top: "", bottom: "", shoe: "" },
  onFrameClose: () => undefined,
};

PictureFrame.defaultProps = defualtProps;

export default PictureFrame;
