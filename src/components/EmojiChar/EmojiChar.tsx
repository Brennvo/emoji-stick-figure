import React from "react";

type Props = {
  ariaLabel: string;
  emoji: string;
  classNames?: string;
};

const EmojiChar = ({ ariaLabel, emoji, classNames }: Props) => (
  <span className={classNames} role="img" aria-label={ariaLabel}>
    {emoji}
  </span>
);

const defaultProps: Props = {
  ariaLabel: "",
  emoji: "",
};

EmojiChar.defaultProps = defaultProps;

export default EmojiChar;
