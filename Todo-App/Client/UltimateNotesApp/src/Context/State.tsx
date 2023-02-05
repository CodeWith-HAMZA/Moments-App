import { message } from "antd";
import React, { useState } from "react";
import { Category } from "../Interfaces/Category";
import { CurrentUser } from "../Interfaces/CurrentUser";
import { CurrentSelectedNote, Note } from "../Interfaces/Note";

import Context from "./Context";

const State = ({ children }: any) => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [AllNotes, setAllNotes] = useState<Note[]>([]);
  const [SelectedNote, setSelectedNote] = useState<Note | null>(null);
  const [SelectedCategory, setSelectedCategory] = useState<string[]>([
    "allMoments",
  ]);
  const [electedCategory, setelectedCategory] = useState<Category>({
    categoryLabel: "All Moments",
    categoryUniqueKey: "All Moments",
  });
  const [ChoosedCategory, setChoosedCategory] = useState<string>("Personal");

  const [CurrentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [Token, setToken] = useState<string | null>(null);
  const [SavedDesc, setSavedDesc] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();
  const [OpenModal, setOpenModal] = useState(false);

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  return (
    <>
      <Context.Provider
        value={
          {
            CurrentUser,
            setCurrentUser,
            AllNotes,
            setAllNotes,
            SelectedNote,
            setSelectedNote,
            SelectedCategory,
            setSelectedCategory,
            electedCategory,
            setelectedCategory,
            Token,
            setToken,
            ChoosedCategory,
            setChoosedCategory,
            SavedDesc,
            setSavedDesc,
            Loading,
            setLoading,
            messageApi,
            OpenModal,
            setOpenModal,
          } as any
        }
      >
        {contextHolder}
        {children}{" "}
      </Context.Provider>
    </>
  );
};

export default State;
