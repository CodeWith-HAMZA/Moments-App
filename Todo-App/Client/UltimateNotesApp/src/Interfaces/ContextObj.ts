import { MessageInstance } from "antd/es/message/interface";
import React from "react";
import { Category } from "./Category";
import { CurrentUser } from "./CurrentUser";
import { Note } from "./Note";

export interface ContextObj {
  CurrentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  AllNotes?: Note[] | null;
  setAllNotes?: React.Dispatch<React.SetStateAction<Note[] | null>>;
  SelectedNote?: Note;
  setSelectedNote?: React.Dispatch<React.SetStateAction<Note>>;
  SelectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  electedCategory: Category;
  setelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
  ChoosedCategory: string;
  setChoosedCategory: React.Dispatch<React.SetStateAction<string>>;
  Token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  SavedDesc: boolean;

  setSavedDesc: React.Dispatch<React.SetStateAction<boolean>>;
  Loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  messageApi: MessageInstance;
  OpenModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
