import React, { useState } from "react";
import { Emoji } from "../../interfaces/Emoji.interface";
import { Avatar } from "../../interfaces/Avatar.interface";
import { EmojiCategory } from "../../enums/EmojiCategory.enum";
import EmojiPicker from "../EmojiPicker";
import "./AvatarMaker.css";
import FittingRoom from "../FittingRoom/FittingRoom";

const initialAvatar = {
  name: "",
  face: "",
  hat: "",
  top: "",
  bottom: "",
  shoe: "",
};

type Props = {
  faces: Emoji[];
  hats: Emoji[];
  tops: Emoji[];
  bottoms: Emoji[];
  shoes: Emoji[];
  onSave: (avatar: Avatar) => void;
  [key: string]: Emoji[] | Function;
};

const AvatarMaker = ({ onSave, ...categories }: Props) => {
  const [creation, setCreation] = useState<Avatar>(initialAvatar);
  const [category, setCategory] = useState<EmojiCategory>(EmojiCategory.faces);

  const updateCreation = (emoji: string, categoryName: string) => {
    setCreation(
      (avatar: Avatar): Avatar => ({
        ...avatar,
        [categoryName]: emoji,
      })
    );
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: name } = event.currentTarget;

    setCreation(
      (creation: Avatar): Avatar => ({
        ...creation,
        name,
      })
    );
  };

  const createEmoji = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSave(creation);
    setCreation(initialAvatar);
    setCategory(EmojiCategory.faces);
  };

  return (
    <section className="create-emoji cont cont--direction-col cont--align-center">
      <input
        className="create-emoji__input cont__item--grow"
        type="text"
        onChange={onNameChange}
        placeholder="Enter your avatar's name!"
        value={creation.name || ""}
      />
      <FittingRoom avatar={creation} />
      <div>
        <form onSubmit={createEmoji}>
          <EmojiPicker
            emojis={categories[category]}
            emojiCategory={category}
            onEmojiSelection={updateCreation}
            avatarSelections={Object.values(creation)}
          />
          <div className="cont cont--justify-center">
            <button
              className={`create-emoji__btn ${
                category === EmojiCategory.faces
                  ? "create-emoji__btn--disabled"
                  : ""
              }`}
              type="button"
              onClick={() =>
                setCategory((prevCategory: EmojiCategory) => {
                  switch (prevCategory) {
                    case EmojiCategory.shoes:
                      return EmojiCategory.bottoms;
                    case EmojiCategory.bottoms:
                      return EmojiCategory.tops;
                    case EmojiCategory.tops:
                      return EmojiCategory.hats;
                    case EmojiCategory.hats:
                      return EmojiCategory.faces;
                    default:
                      return EmojiCategory.faces;
                  }
                })
              }
            >
              Previous Category
            </button>
            {category === EmojiCategory.shoes ? (
              <input
                className="create-emoji__btn"
                type="submit"
                value="Finish"
              />
            ) : (
              <button
                className="create-emoji__btn"
                type="button"
                onClick={() =>
                  setCategory((prevCategory: EmojiCategory) => {
                    switch (prevCategory) {
                      case EmojiCategory.faces:
                        return EmojiCategory.hats;
                      case EmojiCategory.hats:
                        return EmojiCategory.tops;
                      case EmojiCategory.tops:
                        return EmojiCategory.bottoms;
                      case EmojiCategory.bottoms:
                        return EmojiCategory.shoes;
                      default:
                        return EmojiCategory.shoes;
                    }
                  })
                }
              >
                Next Category
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

const defaultProps: Props = {
  faces: [],
  hats: [],
  tops: [],
  bottoms: [],
  shoes: [],
  onSave: () => undefined,
};

AvatarMaker.defaultProps = defaultProps;

export default AvatarMaker;
