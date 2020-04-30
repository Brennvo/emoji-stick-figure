import React from "react";
import { Avatar } from "../../interfaces/Avatar.interface";
import EmojiChar from "../EmojiChar";
import "./AvatarCreation.scss";

type Props = {
  avatar: Avatar;
  classNames?: string;
};

const AvatarCreation = ({ avatar, classNames }: Props) => (
  <ul className={`avatar ${classNames ? classNames : ""}`}>
    {avatar.hat && (
      <li>
        <EmojiChar ariaLabel="hat" emoji={avatar.hat} />
      </li>
    )}
    {avatar.face && (
      <li>
        <EmojiChar ariaLabel="face" emoji={avatar.face} />
      </li>
    )}
    {avatar.top && (
      <li>
        <EmojiChar ariaLabel="top" emoji={avatar.top} />
      </li>
    )}
    {avatar.bottom && (
      <li>
        <EmojiChar ariaLabel="bottom" emoji={avatar.bottom} />
      </li>
    )}
    {avatar.shoe && (
      <li>
        <EmojiChar ariaLabel="shoe" emoji={avatar.shoe} />
      </li>
    )}
  </ul>
);

const defaultProps: Props = {
  avatar: {},
};

AvatarCreation.defaultProps = defaultProps;

export default AvatarCreation;
