import React, { useState } from "react";
import Head from 'next/head';
import LayoutContentWrapper from 'components/utility/layoutWrapper';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
import PageHeader from 'components/utility/pageHeader';
import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import { Table, Switch, Radio, Form } from "antd";
import {
  EditOutlined,
  TeamOutlined,
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const TeamsTable = ({ users }) => {
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

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      filters: [
        {
          text: "Norbert",
          value: "Norbert",
        }
      ],
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
      title: "Action",
      key: "action",
      render: () => (
        <span>
          <EyeOutlined />
          <DeleteOutlined />
          <SettingOutlined />
        </span>
      ),
    },
  ];

  const scroll = {};
  if (state.xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns;

  if (state.xScroll === "fixed") {
    columns[0].fixed = true;
    columns[columns.length - 1].fixed = "right";
  } 

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

TeamsTable.getInitialProps = async () => {
  const url = buildUrl("/api/user/all");
  const res = await fetch(url);
  const users = await res.json();
  return { users };
};

export default TeamsTable;
