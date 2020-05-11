import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Row,
  Col,
  Progress,
  Card,
  List,
  Empty,
  Collapse,
  Tooltip,
  Popconfirm,
  message,
} from "antd";

import Tabs, { TabPane } from "components/uielements/tabs";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";
import AddNewMembersModal from "./addNewMembersModal";

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import basicStyle from "assets/styles/constants";

import * as configs from "./chart.config";
import GoogleChart from "react-google-charts";

import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { rowStyle, colStyle } = basicStyle;

const TeamProfile = ({ selectedTeam, usersList }) => {
  const router = useRouter();
  const { teamId } = router.query;
  const teamData = selectedTeam.data.teamProfile;
  const membersData = selectedTeam.data.teamMembersData;
  const usersListData = usersList.data;
  const teamMembers = teamData.members;
  const googleChartData = [["Competency", "Score"]];
  let memberIds = [];
  let teamCompetencies = [];
  let mergedCompetencies = [];
  membersData &&
    membersData.map((member) => {
      memberIds.push(member._id);
      if (member.competencies && member.competencies.length > 0) {
        teamCompetencies.push(member.competencies[0]);
      }
    });

  const usersNotJoined = usersListData.filter(
    (user) => !memberIds.includes(user._id)
  );

  const [state, setState] = useState({
    addNewMemberModal: false,
  });

  const openAddNewMembers = () => {
    setState({
      addNewMemberModal: true,
    });
  };

  const handleCancel = () => {
    setState({
      addNewMemberModal: false,
    });
  };

  const onRemoveMember = async (memberId) => {
    const res = await fetch(`/api/teams/${teamId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: memberId,
      }),
    });
    if (res.status === 204) {
      message.success("Member succesfully removed!");
      TeamProfile.getInitialProps();
      onReload();
    } else {
      message.error("Ooops! Something went wrong!");
    }
  };

  const onReload = () => {
    router.reload(`/dashboard/teams/${teamId}`);
  };

  const renderCompetencyLevel = (userCompetencies) => {
    if (userCompetencies && userCompetencies.length > 0) {
      return userCompetencies.map((competency, index) => {
        return (
          <span key={`${competency.title}_${index}`}>
            <p>{competency.title}</p>
            <Progress percent={competency.competencyScore} size="small" />
          </span>
        );
      });
    }
    return <p>User has no competency quizzes started.</p>;
  };

  const renderTeamCompetenciesChart = () => {
    teamCompetencies.reduce((result, current, index) => {
      if (result.slug === current.slug) {
        mergedCompetencies.push({
          competencySlug: current.slug,
          competencyTitle: current.title,
          teamCompetencyScore: result.competencyScore + current.competencyScore,
          numberOfCompetencies: index + 1,
        });
      } else {
        mergedCompetencies.push({
          competencySlug: current.slug,
          competencyTitle: current.title,
          teamCompetencyScore: current.competencyScore,
          numberOfCompetencies: index,
        });
      }
    });

    mergedCompetencies.map((competency) => {
      let data = [
        competency.competencyTitle,
        competency.teamCompetencyScore / competency.numberOfCompetencies,
      ];
      googleChartData.push(data);
    });

    const googleConfig = {
      ...configs.teamCompetencyChart,
      data: googleChartData,
    };
    console.log('googleConfig', googleConfig)
    console.log('mergedCompetencies', mergedCompetencies)
    return <GoogleChart {...googleConfig} />;
  };

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <DashboardLayout>
        <LayoutContentWrapper>
          <Row style={rowStyle} gutter={10} justify="start">
            <Col span={24} style={colStyle}>
              <Card
                title={teamData.teamName}
                extra={<EditOutlined key="edit" onClick={() => {}} />}
              >
                <p>Description: {teamData.description}</p>
                <Collapse
                  defaultActiveKey={["0"]}
                  onChange={() => {}}
                  expandIconPosition={"left"}
                >
                  <Panel
                    header="Members"
                    extra={
                      <Tooltip title="Add New Members">
                        <PlusOutlined onClick={() => openAddNewMembers()} />
                      </Tooltip>
                    }
                  >
                    {membersData ? (
                      <List
                        itemLayout="horizontal"
                        dataSource={membersData}
                        renderItem={(item) => (
                          <List.Item
                            actions={[
                              <Tooltip
                                placement="topRight"
                                title={`Remove ${item.firstName} ${item.lastName} from team`}
                              >
                                {" "}
                                <Popconfirm
                                  title={`You really want to remove ${item.firstName} ${item.lastName} from team?`}
                                  placement="leftTop"
                                  icon={
                                    <QuestionCircleOutlined
                                      style={{ color: "red" }}
                                    />
                                  }
                                  okText="Yes"
                                  cancelText="No"
                                  onConfirm={() => onRemoveMember(item._id)}
                                  key={`${item._id}_delete`}
                                >
                                  <DeleteOutlined
                                    style={{ color: "#f83e46" }}
                                  />
                                </Popconfirm>
                              </Tooltip>,
                            ]}
                          >
                            <List.Item.Meta
                              title={
                                <a href="">
                                  {item.firstName} {item.lastName}
                                </a>
                              }
                              description={renderCompetencyLevel(
                                item.competencies
                              )}
                            />
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No Members"
                      />
                    )}
                  </Panel>
                  <Panel header="Competencies Avarage Score">
                    {renderTeamCompetenciesChart()}
                  </Panel>
                </Collapse>
              </Card>
            </Col>

            <AddNewMembersModal
              visible={state.addNewMemberModal}
              handleCancel={() => handleCancel()}
              usersList={usersNotJoined}
              teamId={teamId}
            />
          </Row>
        </LayoutContentWrapper>
      </DashboardLayout>
    </>
  );
};

TeamProfile.getInitialProps = async ({ query }) => {
  const { teamId } = query;
  const teamsUrl = buildUrl(`/api/teams/${teamId}`);
  const usersUrl = buildUrl("/api/user/all");
  const [selectedTeam, usersList] = await Promise.all([
    await fetch(teamsUrl).then((r) => r.json()),
    await fetch(usersUrl).then((r) => r.json()),
  ]);
  return { selectedTeam, usersList };
};

export default TeamProfile;
