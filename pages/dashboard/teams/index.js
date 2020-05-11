import React, {useState} from "react";
import Head from "next/head";
import { Row, Col, Spin, Card, Modal, Button } from "antd";
import { useRouter } from "next/router";
import Tabs, { TabPane } from "components/uielements/tabs";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import basicStyle from "assets/styles/constants";

import {
  EyeOutlined,
} from "@ant-design/icons";

const { rowStyle, colStyle } = basicStyle;

const TeamsTable = ({ teams }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const viewTeamProfile = (teamId) => {
    router.replace(`/dashboard/teams/${teamId}`);
  }

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

            <Row style={rowStyle} gutter={10} justify="start">
              <Button type="primary" onClick={() => displayModal('editModal')}>
                Add Team
              </Button>
            </Row>

            <Row style={rowStyle} gutter={10} justify="start">
              {teams.data.map((team, idx) => (
                <Col lg={12} md={12} sm={12} xs={24} style={colStyle} key={idx}>
                  <Card
                    title={team.teamName}
                    extra={<EyeOutlined key="edit" onClick={() => viewTeamProfile(team._id)} />}
                  >
                    <p>{team.description}</p>
                    <p>Members: {team.members.length}</p>
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
