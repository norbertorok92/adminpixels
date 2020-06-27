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
  Spin
} from "antd";

import Tabs, { TabPane } from "components/uielements/tabs";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";
import AddNewMembersModal from "./addNewMembersModal";

import { useUser } from "utils/hooks";
import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import basicStyle from "assets/styles/constants";

import * as configs from "utils/chart.config";
import {mergeCompetencies} from "utils/utils";
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
  const [user] = useUser();
  const router = useRouter();
  const { teamId } = router.query;

  const teamData = selectedTeam.data && selectedTeam.data.teamProfile;
  const membersData = selectedTeam.data && selectedTeam.data.teamMembersData;
  const usersListData = usersList.data;
  const teamMembers = teamData && teamData.members;
  const googleChartData = [["Competency", "Score"]];
  let memberIds = [];
  let teamCompetencies = [];
  let mergedCompetencies = [];
  membersData &&
    membersData.map((member) => {
      memberIds.push(member._id);
      if (member.competencies && member.competencies.length > 0) {
        teamCompetencies.push(...member.competencies);
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
    router.push(`/dashboard/teams/${teamId}`);
  };

  const renderCompetencyLevel = (userCompetencies) => {
    if (userCompetencies && userCompetencies.length > 0) {
      return userCompetencies.map((competency, index) => {
        if(competency.competencyScore !== 0) {
          return (
            <span key={`${competency.title}_${index}`}>
              <p>{competency.title}({competency.category.toUpperCase()})</p>
              <Progress percent={competency.competencyScore} size="small" />
            </span>
          );
        }
      });
    }
    return <p>User has no competency quizzes started.</p>;
  };

  const renderTeamCompetenciesChart = () => {
    let quizzes = [];
    let quizScores = [];
    let quizzesCount = {};

     if (teamCompetencies.length > 0) {
      teamCompetencies.map((competency, index) => {
        if (competency.competencyScore > 0) {
          quizzes.push(competency.title.toUpperCase());
        }
        quizScores.push([
          `${competency.title.toUpperCase()}(${competency.category.toUpperCase()})`,
          competency.competencyScore,
        ]);
      });

      quizzes.map((quiz) => {
        return (quizzesCount[quiz] = (quizzesCount[quiz] || 0) + 1);
      });

      const quizScoreCount = quizScores.reduce((accumulator, cur) => {
        let competencyTitle = cur[0];
        let found = accumulator.find((elem) => elem[0] === competencyTitle);
        if (found) found[1] += cur[1];
        else accumulator.push(cur);
        return accumulator;
      }, []);

      quizScoreCount.map((quiz) => {
        if (quiz[1] !== 0) {
          const regExp = /\(([^)]+)\)/;
          let quizName = quiz[0].replace(/\(([^)]+)\)/, "")
          let quizCount = quizzesCount[quizName];
          let quizAvg = quiz[1] / quizCount;
          return googleChartData.push([quiz[0], quizAvg]);
        }
      });

      const googleConfig = {
        ...configs.teamCompetencyChart,
        data: googleChartData,
      };
      return <GoogleChart {...googleConfig} />;
    }

    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No Competency to evaluate 😥"
      />
    );
  };

  if (!user) {
    return (
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
    );
  }

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <DashboardLayout>
        <LayoutContentWrapper>
          {user && teamData ? (
            <Row style={rowStyle} gutter={10} justify="start">
              <Col span={24} style={colStyle}>
                <Card
                  title={teamData.teamName}
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
                        user.userRole === "Manager" && (
                          <Tooltip title="Add New Members">
                            <PlusOutlined onClick={() => openAddNewMembers()} />
                          </Tooltip>
                        )
                      }
                    >
                      {membersData ? (
                        <List
                          itemLayout="horizontal"
                          dataSource={membersData}
                          renderItem={(item) => (
                            <List.Item
                              actions={[
                                user.userRole === "Manager" && (
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
                                  </Tooltip>
                                ),
                              ]}
                            >
                              <List.Item.Meta
                                title={
                                  <a href={`/dashboard/profile/${item._id}`}>
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
