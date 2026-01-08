import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BookOutlined, UserAddOutlined, TeamOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 🔔 Toast */}
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />

      {/* 🟦 Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 flex items-center justify-center text-white font-bold">
          ADMIN
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["course"]}
          items={[
            {
              key: "course",
              icon:<BookOutlined />,
              label: <Link to="">Courses</Link>,
            },
            {
              key: "student",
              icon:<UserAddOutlined />,
              label: <Link to="student">Student</Link>, // ✅ fixed
            },
            {
                key: "teacher",
                icon:<TeamOutlined />,
                label: <Link to="teacher">Teacher</Link>
            },

          ]}
        />
      </Sider>

      {/* 🟨 Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* 👇 Child pages render here */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
