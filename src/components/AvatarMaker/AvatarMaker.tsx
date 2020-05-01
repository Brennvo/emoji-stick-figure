import React, { useState } from "react";
import { Emoji } from "../../interfaces/Emoji.interface";
import { Avatar } from "../../interfaces/Avatar.interface";
import { EmojiCategory } from "../../enums/EmojiCategory.enum";
import EmojiPicker from "../EmojiPicker";
import "./AvatarMaker.scss";
import FittingRoom from "../FittingRoom/FittingRoom";

const initialAvatar = {
  hat: "",
  face: "",
  top: "",
  bottom: "",
  shoe: "",
  toString: function () {
    const apparelItems: any = Object.values(this).filter(
      (value) => value !== "" && typeof value === "string"
    );
    return apparelItems.join("\n");
  },
};

type Props = {
  faces: Emoji[];
  hats: Emoji[];
  tops: Emoji[];
  bottoms: Emoji[];
  shoes: Emoji[];
  onFinish: (avatar: Avatar) => void;
  [key: string]: Emoji[] | Function;
};

const AvatarMaker = ({ onFinish, ...categories }: Props) => {
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

  const createEmoji = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onFinish(creation);
    setCreation(initialAvatar);
    setCategory(EmojiCategory.faces);
  };

  return (
    <section className="create-emoji cont cont--direction-col cont--align-center">
      <FittingRoom avatar={creation} />
      <div>
        <form onSubmit={createEmoji}>
          <EmojiPicker
            emojis={categories[category]}
            emojiCategory={category}
            onEmojiSelection={updateCreation}
            avatarSelections={Object.values(creation)}
          />
          <div className="cont cont--justify-center create-emoji__btn-group">
            {category !== EmojiCategory.faces && (
              <button
                className="create-emoji__btn"
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
            )}
            {category === EmojiCategory.shoes ? (
              <input
                className="create-emoji__btn--final"
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
  onFinish: () => undefined,
};

AvatarMaker.defaultProps = defaultProps;

export default AvatarMaker;
