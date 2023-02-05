import React, { useContext, useEffect, useState } from "react";
import { FloatButton } from "antd";
import {
  CommentOutlined,
  CustomerServiceOutlined,
  DeleteFilled,
  EditFilled,
  EllipsisOutlined,
  FileDoneOutlined,
  LoadingOutlined,
  SaveFilled,
  SaveOutlined,
  SaveTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import Context from "../Context/Context";
interface Props {
  EditorText: string;
}
const SaveDescriptionFloat: React.FC<Props> = ({ EditorText }: Props): JSX.Element => {
  // const [Loading, setLoading] = useState<boolean>(false);
  const context = useContext(Context);

  async function updateSelectedCurrentNote() {
    try {
      context?.setLoading(true);
      const { data } = await axios.put(
        `http://localhost:8080/updatenote/${context?.SelectedNote?.owner}?noteId=${context?.SelectedNote?.id}`,
        {
          title: context?.SelectedNote?.title,
          description: EditorText,
          tags: ["Tag2", "Tag1", "Tag34"],
          categories: [context?.SelectedNote?.categories[0]],
        }
      );
      context?.setLoading(false);
      context?.setSavedDesc(true);
      console.log(data);
    } catch (error) {
      console.log("PUT ERROR", error);
    }
  }

  function showIcon() {
    if (context?.Loading) return <LoadingOutlined />;
    if (context?.SavedDesc) return <FileDoneOutlined />;
    else return <SaveOutlined />;
  }

  useEffect(() => {
    context?.setSavedDesc(false);
  }, [EditorText]);

  return (
    <>
      <FloatButton
        onClick={updateSelectedCurrentNote}
        shape="square"
        type="primary"
        tooltip={() => <>{context?.SavedDesc ? "Saved!" : "Not Saved!"}</>}
        style={{ right: 24 }}
        icon={showIcon()}
      />
    </>
  );
};

export default SaveDescriptionFloat;
