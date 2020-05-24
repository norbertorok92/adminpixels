import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";
import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import {
  Table,
  Popconfirm,
  message,
  Tooltip,
  Space,
  Tag,
  Row,
  Button,
  Spin,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useUser } from "utils/hooks";
import AddNewUserModal from "./addNewUserModal";

const createUserButtonStyle = {
  flexDirection: "row-reverse",
  display: "flex",
  width: "100%",
  margin: "0 20px 10px 0",
};

const UsersTable = ({ users }) => {
  const [user] = useUser();
  const router = useRouter();
  const showHeader = true;
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    size: "middle",
    showHeader,
    top: "none",
    bottom: "bottomRight",
    // xScroll: "fixed",
  });

  const displayModal = (type) => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const renderFilter = () => {
    let list = [];
    users.data.map((user, index) => {
      list.push({
        text: user.firstName,
        value: user.firstName,
        key: `${index + 1}`,
      });
    });
    return list;
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      filters: renderFilter(),
      fixed: "left",
      width: 200,
      key: "firstName",
      onFilter: (value, record) => record.firstName.indexOf(value) === 0,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      fixed: "left",
      width: 200,
      key: "lastName",
      // sorter: (a, b) => a.lastName - b.lastName,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 300,
    },
    {
      title: "Role",
      dataIndex: "userRole",
      key: "userRole",
      width: 100,
      render: (userRole) => (
        <>{userRole === 'member' ? <Tag color="#87d068">{userRole}</Tag> : <Tag color="#2db7f5">{userRole}</Tag>}</>
      ),
    },
    {
      title: "Team",
      dataIndex: "memberOfTeams",
      key: "memberOfTeams",
      width: 300,
      render: (memberOfTeams) => (
        <>
          {memberOfTeams && memberOfTeams.length > 0 ? (
            memberOfTeams.map((team, index) => {
              return <Tag key={`${team}_${index}`}>{team.toUpperCase()}</Tag>;
            })
          ) : (
            <Tag color="volcano">No Team</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      fixed: "right",
      key: "action",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <Tooltip title="View Profile">
            <EyeOutlined
              onClick={() => onViewProfile(record._id)}
              key={`${record._id}_view`}
            />
          </Tooltip>
          {user && user.userRole === "Manager" && (
            <Tooltip title="Delete User">
              <Popconfirm
                title={`You really want to delete ${record.firstName} ${record.lastName}?`}
                placement="leftTop"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                okText="Yes"
                cancelText="No"
                onConfirm={() => onDeleteUser(record._id)}
                key={`${record._id}_delete`}
              >
                <DeleteOutlined style={{ color: "#f83e46" }} />
              </Popconfirm>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];
  const scroll = {};

  // if (state.xScroll === "fixed") {
  //   columns[0].fixed = true;
  //   columns[columns.length - 1].fixed = "right";
  // }

  // if (state.xScroll) {
  //   scroll.x = "100vw";
  // }

  const onReload = () => {
    router.push("/dashboard/people");
  };

  const tableColumns = columns;

  const onViewProfile = (userId) => {
    router.replace(`/dashboard/profile/${userId}`);
  };

  const onDeleteUser = async (userId) => {
    const res = await fetch(`/api/user/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 204) {
      message.success("User succesfully deleted!");
      UsersTable.getInitialProps();
      onReload();
    } else {
      message.error("Ooops! Something went wrong!");
    }
  };

  return (
    <>
      <Head>
        <title>People</title>
      </Head>
      <DashboardLayout>
        <LayoutContentWrapper>
          {user ? (
            <>
              <PageHeader>People</PageHeader>

              {user.userRole === "Manager" && (
                <Row style={createUserButtonStyle} justify="start">
                  <Button type="primary" onClick={() => displayModal()}>
                    Create new user
                  </Button>
                </Row>
              )}

              <div>
                <Table
                  columns={columns}
                  dataSource={users.data}
                  scroll={{ x: "100%" }}
                />
              </div>
              <AddNewUserModal
                visible={visible}
                handleCancel={() => handleCancel()}
              />
            </>
          ) : (
            <div
              style={{
                minHeight: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin />
            </div>
          )}
        </LayoutContentWrapper>
      </DashboardLayout>
    </>
  );
};

UsersTable.getInitialProps = async () => {
  const url = buildUrl("/api/user/all");
  const res = await fetch(url);
  const users = await res.json();
  return { users };
};

export default UsersTable;
