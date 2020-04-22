import React from "react";
import "./PictureFrame.css";
import { Avatar } from "../../interfaces/Avatar.interface";
import AvatarCreation from "../AvatarCreation";

type Props = {
  avatar: Avatar;
  onFrameClose: () => void;
};

const PictureFrame = ({ avatar, onFrameClose }: Props) => (
  <div className="frame">
    <div className="frame__photo">
      <AvatarCreation avatar={avatar} />
      <h1 className="frame__photo__name">{avatar.name}</h1>
      <button className="frame__photo__close" onClick={onFrameClose}>
        x
      </button>
    </div>
  </div>
);

const defualtProps: Props = {
  avatar: { name: "", face: "", hat: "", top: "", bottom: "", shoe: "" },
  onFrameClose: () => undefined,
};

PictureFrame.defaultProps = defualtProps;

export default PictureFrame;
