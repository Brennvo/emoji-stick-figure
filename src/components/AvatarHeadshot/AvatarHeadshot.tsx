import React from "react";
import "./AvatarHeadshot.scss";
import EmojiChar from "../EmojiChar";

type Props = {
  name: string;
  face: string;
};

const AvatarHeadshot = ({ name, face }: Props) => (
  <div className="card">
    <div className="card__avatar">
      <EmojiChar
        classNames="card__avatar__emoji"
        ariaLabel="face"
        emoji={face}
      />
    </div>
    <div>{name}</div>
  </div>
);

const defaultProps: Props = {
  name: "",
  face: "",
};

AvatarHeadshot.defaultProps = defaultProps;

export default AvatarHeadshot;
