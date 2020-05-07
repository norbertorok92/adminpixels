import React from "react";
import Head from "next/head";
import { Row, Col, Spin, Progress, Card } from "antd";

import Tabs, { TabPane } from "components/uielements/tabs";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import basicStyle from "assets/styles/constants";

import {
  EditOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { rowStyle, colStyle } = basicStyle;

const TeamsTable = ({ teams }) => {

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      {teams.data ? (
        <DashboardLayout>
          <LayoutContentWrapper>
            <PageHeader>
              Teams
            </PageHeader>

            <Row style={rowStyle} gutter={5} justify="start">
              {teams.data.map((team, idx) => (
                <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
                  <Card
                    actions={[
                      <EyeOutlined key="watch" />,
                      <EditOutlined key="edit" />,
                      <TeamOutlined key="ellipsis" />,
                    ]}
                  >
                    <div className="isoProgressWidgetTopbar">
                      <h3>{team.teamName}</h3>
                    </div>

                    <div className="isoProgressWidgetBody">
                      <p className="isoDescription">{team.description}</p>
                      <Progress
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }}
                        percent={team.competencyScore}
                      />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </LayoutContentWrapper>
        </DashboardLayout>
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
    </>
  );
};

TeamsTable.getInitialProps = async () => {
  const url = buildUrl("/api/teams/all");
  const res = await fetch(url);
  const teams = await res.json();
  return { teams };
};

export default TeamsTable;
