import React from "react";
import { Avatar } from "../../interfaces/Avatar.interface";
import AvatarHeadshot from "../AvatarHeadshot/AvatarHeadshot";

type Props = {
  avatars: Avatar[];
  onOpen: (avatar: Avatar) => void;
};

const AvatarCreationList = ({ avatars, onOpen }: Props) => (
  <div className="cont">
    {avatars.map((avatar: Avatar, i) => (
      <div key={i} className="cont cont--direction-col">
        <button className="btn--hidden" onClick={() => onOpen(avatar)}>
          <AvatarHeadshot face={avatar.face} name={avatar.name} />
        </button>
      </div>
    ))}
  </div>
);

const defaultProps: Props = {
  avatars: [],
  onOpen: (avatar) => undefined,
};

AvatarCreationList.defaultProps = defaultProps;

export default AvatarCreationList;
