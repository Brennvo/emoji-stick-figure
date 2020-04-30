import React from "react";
import { Emoji } from "../../interfaces/Emoji.interface";
import { EmojiCategory } from "../../enums/EmojiCategory.enum";
import "./EmojiPicker.scss";

type Props = {
  emojis: Emoji[];
  emojiCategory: EmojiCategory;
  onEmojiSelection: (emojiChar: string, categoryName: string) => void;
  avatarSelections: string[];
};

const EmojiPicker = ({
  emojis,
  emojiCategory,
  onEmojiSelection,
  avatarSelections,
}: Props) => (
  <fieldset className="emoji-fieldset">
    <legend>Pick from these {emojiCategory}:</legend>
    {emojis.map((emoji: Emoji) => (
      <span
        className={`emoji-fieldset__optn ${
          avatarSelections.includes(emoji.emojiChar)
            ? "emoji-fieldset__optn--selected"
            : "emoji-fieldset__optn--not-selected"
        }`}
      >
        <label htmlFor={emoji.name}>{emoji.emojiChar}</label>
        <input
          name={EmojiCategory[emojiCategory]}
          checked={avatarSelections.includes(emoji.emojiChar)}
          value={emoji.emojiChar}
          type="radio"
          className="element--hide"
          id={emoji.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onEmojiSelection(event.target.value, emoji.category)
          }
        />
      </span>
    ))}
  </fieldset>
);

const defaultProps: Props = {
  emojis: [],
  emojiCategory: EmojiCategory.faces,
  onEmojiSelection: () => undefined,
  avatarSelections: [""],
};

EmojiPicker.defaultProps = defaultProps;

export default EmojiPicker;
