import React, { useReducer } from "react";
import "./App.scss";
import { Emoji } from "./interfaces/Emoji.interface";
import { Avatar } from "./interfaces/Avatar.interface";
import PageWrapper from "./layouts/PageWrapper/PageWrapper";
import AvatarMaker from "./components/AvatarMaker";
import Modal from "./components/Modal";
import PictureFrame from "./components/PictureFrame";
import emojis from "./data/emojis";

enum ActionType {
  SET_DATA = "SET_DATA",
  SET_ERROR = "SET_ERROR",
  ADD_AVATAR = "ADD_AVATAR",
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}

type AppState = {
  isLoading: boolean;
  isError: boolean;
  isModalOpen: boolean;
  emojis?: Emoji[];
  avatars: Avatar[];
  selectedAvatar?: Avatar;
  errMsg?: string;
};

const initialAppState: AppState = {
  isLoading: true,
  isError: false,
  isModalOpen: false,
  avatars: [],
};

type Action =
  | { type: ActionType.SET_DATA; data: Emoji[] }
  | { type: ActionType.SET_ERROR; errMsg: string }
  | { type: ActionType.ADD_AVATAR; data: Avatar }
  | { type: ActionType.OPEN_MODAL; data: Avatar }
  | { type: ActionType.CLOSE_MODAL };

const reducer: React.Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        selectedAvatar: action.data,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return { ...state };
  }
};

const App = () => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialAppState
  );

  const openModal = (avatar: Avatar) =>
    dispatch({ type: ActionType.OPEN_MODAL, data: avatar });

  const onModalClose = () => dispatch({ type: ActionType.CLOSE_MODAL });

  return (
    <div className="App">
      <PageWrapper>
        <AvatarMaker
          faces={emojis.filter((emoji) => emoji.category === "face")}
          hats={emojis.filter((emoji) => emoji.category === "hat")}
          tops={emojis.filter((emoji) => emoji.category === "top")}
          bottoms={emojis.filter((emoji) => emoji.category === "bottom")}
          shoes={emojis.filter((emoji) => emoji.category === "shoe")}
          onFinish={openModal}
        />
        <Modal isOpen={state.isModalOpen}>
          <PictureFrame
            onFrameClose={onModalClose}
            avatar={state.selectedAvatar}
          />
        </Modal>
      </PageWrapper>
    </div>
  );
};

export default App;
