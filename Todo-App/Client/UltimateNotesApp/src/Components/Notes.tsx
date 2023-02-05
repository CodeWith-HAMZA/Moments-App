import { Button, Layout, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Search from "antd/es/transfer/search";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import ModalBody from "./ModalBody";

import { useQuill } from "react-quilljs";
import SelectableFilter from "./SelectableFilter";
import Context from "../Context/Context";
import { ContextObj } from "../Interfaces/ContextObj";
import NoteItem from "./Note";
import { Note } from "../Interfaces/Note";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SaveNote from "./SaveNote";
interface Props {}
const Notes: React.FC<Props> = ({}: Props): JSX.Element => {
  const context: ContextObj | null = useContext<ContextObj | null>(Context);
  const selectedNoteRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [Err, setErr] = useState<boolean>(false);
  const nav = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    (async () => {
      try {
        if (context?.Token) {
          const { data } = await axios.get(
            `http://localhost:8080/getallnotes/${context?.Token}`
          );

          if (data?.success) {
            const SortedByDate = data?.allNotes.sort((n1: Note, n2: Note) => {
              if (n1.dateInMs - n2.dateInMs < 0) {
                console.log(new Date(n1.dateInMs).toLocaleDateString());
                return 1;
              } else {
                return -1;
              }
            }); 
            context?.setAllNotes?.([...SortedByDate]);
            console.log(SortedByDate, data)
            // nav("/");

            // * Both Should Variables Must Be Defined To Proceed Further
            if (context.setSelectedNote && data?.allNotes[0]) {
              context.setSelectedNote?.(data?.allNotes[0] as Note);
            }
            setErr(false)
          }
        } else {
          setErr(true);
        }
      } catch (error) {
        setErr(true);
        console.log(error);
      }
    })();
  }, [context?.Loading, context?.Token]);

  const onSearch = (value: string) => console.log(value);
  return (
    <>
      <section
        style={{ width: "16rem", height: "100%", background: "#f0f0f0" }}
      >
        <Typography.Text style={{ fontWeight: "" }}>
          {"Category: "}
        </Typography.Text>
        <Typography.Text style={{ fontSize: "1rem", fontWeight: "bold" }}>
          {context?.electedCategory.categoryLabel}
        </Typography.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text>
            {" "}
            Total Moments: {context?.AllNotes?.length}
          </Typography.Text>
          <SelectableFilter />
        </div>

        {/* Note-Addition Modal */}
        <Layout style={{ gap: "0.52rem", marginTop: "0.82rem" }}>
          <Input
            placeholder="Search Moments"
            onChange={(e) => setSearch(e.target.value)}
          />
          <ModalBody ModalTitle="Create or Edit Current Selected Moment" />
        </Layout>

        {/*   Notes Container */}
        <Layout
          style={{ height: "90vh", overflow: "scroll", background: "#f0f0f0" }}
        >
          {/* {context?.AllNotes?.length !== 0 && <h1>Loading</h1>} */}
          {Err && <h1>There's No Notes, Create one!</h1>}
          {context?.Token && context?.AllNotes ? (
            context?.AllNotes?.filter((note: Note) => {
              if (
                note?.title.toLowerCase().includes(search.toLowerCase()) ===
                true
              ) {
                if (context.electedCategory.categoryLabel === "All Moments") {
                  return true;
                }
                if (
                  context.electedCategory.categoryLabel === note.categories[0]
                ) {
                  return true;
                }
              } else {
                return false;
              }
            }).map((note: Note, idx: number) => (
              <div
                key={idx}
                style={{
                  background:
                    note.id === context.SelectedNote?.id
                      ? "#e6e6e6"
                      : "#f7f7f7",
                }}
                ref={selectedNoteRef}
                onClick={(e) => {
                  if (context?.setSelectedNote) {
                    // * Using THe Optional-Chaning Operator '?.' To Prevent Cause Of "App-Break" If That Entity or object or function is undifined or null
                    context?.setSelectedNote?.(note);
                  }
                }}
              >
                <NoteItem
                  Title={note.title}
                  Description={note.description ?? ""}
                  Category={note.categories[0]}
                />
              </div>
            ))
          ) : (
            <h1>...</h1>
          )}
        </Layout>
      </section>
    </>
  );
};

export default Notes;
