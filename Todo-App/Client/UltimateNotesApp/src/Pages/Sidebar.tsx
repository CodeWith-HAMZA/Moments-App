import React, { useContext, useEffect, useState } from "react";
import {
  FileTextOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, MenuProps, MenuTheme, Tooltip, Typography } from "antd";
import { Layout, Menu, theme } from "antd";
import Notes from "../Components/Notes";
import { useQuill } from "react-quilljs";
import Context from "../Context/Context";
import { ContextObj } from "../Interfaces/ContextObj";
import { Category } from "../Interfaces/Category";
import SaveDescriptionFloat from "../Components/SaveDescriptionFloat";

const { Header, Content, Footer, Sider } = Layout;
// this thwhich this
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [Theme, setTheme] = useState<MenuTheme>("light");
  const context: ContextObj | null = useContext<ContextObj | null>(Context);
  const [EditorText, setEditorText] = useState<string>("");
  const { quill, quillRef } = useQuill();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (quill) {
      quillRef.current.firstChild.innerHTML =
        context?.SelectedNote?.description ?? "";
      quill.on("text-change", () => {
        setEditorText(quillRef.current.firstChild.innerHTML);
        console.log(quillRef.current.firstChild.innerHTML, "ue");
      });
    }
  }, [quill, context?.SelectedNote]);

  useEffect(() => {}, [context?.SelectedNote]);

  // * Notes-Categories-Items (list) To Be Embedded in Side-Bar
  const Categories: string[] = ["Personal", "Educative", "Programming"];

  // * Side-Bar Items (List)
  const items: MenuItem[] = [
    getItem("All Moments", "All Moments", <FileTextOutlined />),
    getItem(
      "Categories",
      "sub2",
      <ReadOutlined />,
      Categories &&
        Categories.map((category, idx) =>
          getItem(category, category + idx.toString(), <FileTextOutlined />)
        )
    ),
  ];

  useEffect(() => {
    // * API-Call
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SaveDescriptionFloat EditorText={EditorText} />
      <Sider
        theme={Theme as MenuTheme}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
        }}
      >
        <div
          style={{
            display: "flex",
            width: "11rem",
            alignItems: "center",
            gap: "0.8rem",
            margin: 16,
            // background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Avatar size={52} icon={<UserOutlined />} />
          {!collapsed && (
            <Typography.Text>
              <Tooltip placement="right" title={context?.CurrentUser?.name}>
                <span>{context?.CurrentUser?.name}</span>
              </Tooltip>
            </Typography.Text>
          )}
        </div>
        <Menu
          theme={Theme as MenuTheme}
          defaultSelectedKeys={[
            context?.electedCategory.categoryUniqueKey as string,
          ]}
          onSelect={(e) => {
            // * Setting State [On-Selecting] The Desired Category
            if (context?.setSelectedCategory) {
              context.setelectedCategory?.({
                categoryLabel:
                  e.key === "All Moments"
                    ? "All Moments"
                    : (e.key.slice(0, e.key.length - 1) as string),
                categoryUniqueKey: e.key as string,
              });
              console.log(e.key);
            }
          }}
          mode="inline"
          items={items}
        />
      </Sider>

      <section
        className="site-layout"
        style={{
          display: "flex",
          paddingTop: "1rem",
          background: "#f0f0f0",
        }}
      >
        <Notes />

        <div style={{ width: "90%", height: "100vh" }}>
          <div ref={quillRef}></div>
        </div>
      </section>
    </Layout>
  );
};

export default Sidebar;
