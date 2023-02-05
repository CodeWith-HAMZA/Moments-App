import React, { useContext, useRef, useState } from "react";
import { Button, FloatButton, Input, InputRef, Modal, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import SelectCategory from "./SelectCategory";
import Context from "../Context/Context";
import { DeleteFilled, EditFilled, EllipsisOutlined } from "@ant-design/icons";

interface Props {
  ModalTitle: string;
}
const ModalBody: React.FC<Props> = ({ ModalTitle }: Props): JSX.Element => {
  // const [OpenModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [forEdit, setForEdit] = useState(false);
  const context = useContext(Context);
  const titleRef = useRef<HTMLSpanElement>();

  // * Function To Show The Modal According To The Given Boolean Constant To Tell Wether It Would Be Opened For "Edit(Put) or Create(Post)" Operation
  const showModal = (isForEdit: boolean) => {
    setForEdit(isForEdit);
    context?.setOpenModal(true);
  };

  // * Add Or POST or Create Operation Of The Moment With API-CALL
  const addNewMoment = async () => {
    setConfirmLoading(true);

    const token = localStorage.getItem("authToken");
    try {
      if (titleRef.current && token) {
        const title = titleRef.current.input.value;
        // * Note-Body
        const body = {
          title,
          description: "Write Description Here...",
          tags: ["tag1", "TTTTT", "tag3"],
          categories: [context?.ChoosedCategory],
        };
        // * Requesting For Adding Note Corresponding To The Given Current-User-Id
        const { data } = await axios.post(
          `http://localhost:8080/addnote/${token}`,
          body
        );
        console.log(context?.ChoosedCategory);
        if (context?.AllNotes && context.setAllNotes)
          // * Appending The Recently Added Note To The AllNotes Array-List
          context?.setAllNotes?.([data.allNotes[0], ...context?.AllNotes]);

        // * Selected The Recently Added Note
        context?.setSelectedNote?.(data.allNotes[0]);
      }
    } catch (error) {
      console.log(error, "CODE");
    }

    setConfirmLoading(false);
    handleCancel();
  };

  // * Close Opened Modal
  const handleCancel = () => {
    context?.setOpenModal?.(false);
  };

  // * edit or Update Current Selected-Modal WIth API-CALL (Spring-Boot)
  async function editTitleSelectedCurrentNote() {
    try {
      setConfirmLoading(true);
      // context?.setLoading(true);
      if (titleRef.current) {
        // context?.setLoading(true);
        const { data } = await axios.put(
          `http://localhost:8080/updatenote/${context?.SelectedNote?.owner}?noteId=${context?.SelectedNote?.id}`,
          {
            title: titleRef.current.input.value,
            tags: ["Tag2", "Tag1", "Tag34"],
            categories: [context?.ChoosedCategory],
          }
        );
        if (data.success) {
          context?.messageApi.open({
            type: "success",
            content: data.message,
          });

          // * Closing Modal
          handleCancel();

          // * Replacing The Targetted-Note (Old-Note) With The Updated-Note
          context?.setAllNotes?.(
            context?.AllNotes?.map((elem) => {
              if (elem.id === context.SelectedNote?.id) {
                console.log(data.allNotes[0]);
                return data.allNotes[0];
              }
              return elem;
            }) as any
          );

          // context?.setLoading(false);
        } else {
          context?.messageApi.open({
            type: "error",
            content: data.message,
          });
        }
      }
      //     context?.setLoading(false);
      // context?.setSavedDesc(true);
    } catch (error: any) {
      context?.messageApi.open({
        type: "error",
        content: error.message,
      });
    }
    setConfirmLoading(false);
  }

  // * Delete Current Selected Modal WIth API-CALL (Spring-Boot)
  async function deleteSelectedCurrentNote() {
    const token = localStorage.getItem("authToken");
    try {
      context?.setLoading(true);
      if (token) {
        const { data } = await axios.delete(
          `http://localhost:8080/deletenote/${token}?noteId=${context?.SelectedNote?.id}`
        );
        // console.log(data);
        // * Changeing State On Client-Side 
        context?.setAllNotes?.(
          context?.AllNotes?.filter(
            (note) => note.id !== context.SelectedNote?.id
          ) ?? []
        );

        if (data?.success) {
          context?.messageApi.open({
            type: "success",
            content: data.message,
          });
        } else {
          context?.messageApi.open({
            type: "error",
            content: data.message,
          });
          console.log(data);
        }
      }
      context?.setLoading(false);
    } catch (error: any) {
      console.log(error);
      context?.messageApi.open({
        type: "error",
        content: error.message,
      });
    }
  }
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 94 }}
        icon={<EllipsisOutlined />}
      >
        <FloatButton
          icon={<EditFilled />}
          type="default"
          description=""
          onClick={() => {
            showModal(true); // * Open Modal Body For Edit(Put) Operation
          }}
        />
        <FloatButton
          icon={<DeleteFilled />}
          type="default"
          description=""
          onClick={() => {
            // * Initiate The Delete Operation On Current-Selected-Moment (On-Click)
            deleteSelectedCurrentNote();
          }}
        />
      </FloatButton.Group>
      <Button
        type="primary"
        block
        onClick={() => {
          showModal(false);
        }}
      >
        Add Moment
      </Button>

      <Modal
        title={forEdit ? "Edit Existing Current Selected Moment" : "Add Moment"}
        open={context?.OpenModal}
        onOk={() => {
          forEdit
            ? editTitleSelectedCurrentNote() // * Initiate Edit(Put) Action With API-Call On Click "Save"
            : addNewMoment(); // * Initialte The Post Action On Click "Save"
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Save"
        cancelText={"Close"}
      >
        <Space direction="vertical" style={{ width: "100%", gap: "0.6rem" }}>
          <Input
            placeholder="Enter Title"
            showCount
            allowClear
            ref={titleRef}
            maxLength={40}
            onChange={() => {}}
          />
          <SelectCategory />
        </Space>
      </Modal>
    </>
  );
};

export default ModalBody;
