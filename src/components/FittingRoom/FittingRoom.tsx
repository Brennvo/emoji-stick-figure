import React from "react";
import { Avatar } from "../../interfaces/Avatar.interface";
import AvatarCreation from "../AvatarCreation";
import "./FittingRoom.scss";

type Props = {
  avatar: Avatar;
};

const FittingRoom = ({ avatar }: Props) => (
  <div className="fitting-room">
    <div className="fitting-room__drapes fitting-room__drapes--left"></div>
    <div className="fitting-room__pole"></div>
    <div className="fitting-room__mirror">
      <div className="fitting-room__character">
        <AvatarCreation avatar={avatar} />
      </div>
    </div>
    <div className="fitting-room__drapes fitting-room__drapes--right"></div>
  </div>
);

export default FittingRoom;
