import { Card, Space, Typography } from "antd";
import React from "react";
interface Props {
  Title: string;
  Description: string;
  Category: string;
}
const Note: React.FC<Props> = ({
  Title,
  Description,
  Category,
}: Props): JSX.Element => {
  function extractContent(givenHTMLText: string) {
    var span = document.createElement("span");
    span.innerHTML = givenHTMLText;
    return span.textContent || span.innerText;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          // border: "1px solid red",
          padding: "0.8rem ",
          width: "15rem",
          margin: "0 auto",
          height: "7.313rem",
          wordBreak: "break-all",
          cursor: "pointer",
          borderBottom: "1px solid rgb(216, 216, 216)",
        }}
        id={"HoverNote"}
      >
        <span style={{ fontSize: "0.6rem", color: "#a4a4a4" }}>{Category}</span>
        <h3
          style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#424242" }}
        >
          {Title}
        </h3>
        <p
          style={{
            fontSize: "0.7rem",
            lineHeight: "0.9rem",
            color: "rgb(131, 131, 131)",
          }}
        >
          {extractContent(Description)}
        </p>
      </div>
    </>
  );
};

export default Note;
