import React, { useReducer, useState, useEffect } from "react";
import "./App.css";
import { Emoji } from "./interfaces/Emoji.interface";
import { Avatar } from "./interfaces/Avatar.interface";
import PageWrapper from "./layouts/PageWrapper/PageWrapper";
import AvatarMaker from "./components/AvatarMaker";
import AvatarCreationList from "./components/AvatarCreationList";
import Modal from "./components/Modal";
import PictureFrame from "./components/PictureFrame";

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
};

const initialAppState: AppState = {
  isLoading: true,
  isError: false,
  isModalOpen: false,
  avatars: [],
};

type Action =
  | { type: ActionType.SET_DATA; data: Emoji[] }
  | { type: ActionType.SET_ERROR }
  | { type: ActionType.ADD_AVATAR; data: Avatar }
  | { type: ActionType.OPEN_MODAL; data: Avatar }
  | { type: ActionType.CLOSE_MODAL };

const reducer: React.Reducer<AppState, Action> = (
  state: AppState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.SET_DATA:
      return {
        ...state,
        isLoading: false,
        isError: false,
        isModalOpen: false,
        emojis: action.data,
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isModalOpen: false,
      };
    case ActionType.ADD_AVATAR:
      return {
        ...state,
        avatars: [...state.avatars, action.data],
      };
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
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  const onSave = (avatar: Avatar) =>
    setAvatars((prevAvatars: Avatar[]) => [...prevAvatars, avatar]);

  const onAvatarOpen = (avatar: Avatar) =>
    dispatch({ type: ActionType.OPEN_MODAL, data: avatar });

  const onModalClose = () => dispatch({ type: ActionType.CLOSE_MODAL });

  useEffect(() => {
    fetch("http://localhost:3001/emojis")
      .then((res) => res.json())
      .then((data: Emoji[]) => dispatch({ type: ActionType.SET_DATA, data }))
      .catch((err) => dispatch({ type: ActionType.SET_ERROR }));
  }, []);

  if (state.isLoading) return <p>Loading...</p>;

  if (state.isError) return <p>Sorry, we could not process your request.</p>;

  return (
    <div className="App">
      <h1>Emoji Creator</h1>
      <PageWrapper>
        <AvatarMaker
          faces={state.emojis!.filter((emoji) => emoji.category === "face")}
          hats={state.emojis!.filter((emoji) => emoji.category === "hat")}
          tops={state.emojis!.filter((emoji) => emoji.category === "top")}
          bottoms={state.emojis!.filter((emoji) => emoji.category === "bottom")}
          shoes={state.emojis!.filter((emoji) => emoji.category === "shoe")}
          onSave={onSave}
        />
        <AvatarCreationList onOpen={onAvatarOpen} avatars={avatars} />
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
