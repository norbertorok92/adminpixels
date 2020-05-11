import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";
import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import { Table, Popconfirm, message, Tooltip, Space, Tag } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const UsersTable = ({ users }) => {
  const router = useRouter();
  const showHeader = true;
  const pagination = { position: "bottom" };
  const [state, setState] = useState({
    pagination,
    size: "middle",
    showHeader,
    scroll: undefined,
    tableLayout: undefined,
    top: "none",
    bottom: "bottomRight",
    xScroll: "fixed",
  });
  const renderFilter = () => {
    let list = [];
    users.data.map((user) => {
      list.push({
        text: user.firstName,
        value: user.firstName,
      });
    });
    return list;
  };
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      filters: renderFilter(),
      onFilter: (value, record) => record.firstName.indexOf(value) === 0,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      // sorter: (a, b) => a.lastName - b.lastName,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Team",
      dataIndex: "memberOfTeams",
      render: (memberOfTeams) => (
        <>
          {memberOfTeams && memberOfTeams.length > 0 ? (
            memberOfTeams.map((team) => {
              return <Tag key={team}>{team.toUpperCase()}</Tag>;
            })
          ) : (
            <Tag color="volcano">
              No Team
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Tooltip title="View Profile">
            <EyeOutlined
              onClick={() => onViewProfile(record._id)}
              key={`${record._id}_view`}
            />
          </Tooltip>
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
        </Space>
      ),
    },
  ];
  const scroll = {};

  if (state.xScroll === "fixed") {
    columns[0].fixed = true;
    columns[columns.length - 1].fixed = "right";
  }

  if (state.xScroll) {
    scroll.x = "100vw";
  }

  const onReload = () => {
    router.reload("/dashboard/people");
  };

  const tableColumns = columns;

  const onViewProfile = (profileId) => {
    router.replace(`/dashboard/profile/${profileId}`);
  };

  const onDeleteUser = async (profileId) => {
    const res = await fetch(`/api/user/${profileId}`, {
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
          <PageHeader>People</PageHeader>
          <div>
            <Table
              {...state}
              pagination={{ position: state.bottom }}
              columns={columns}
              dataSource={users.data}
              scroll={scroll}
            />
          </div>
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
