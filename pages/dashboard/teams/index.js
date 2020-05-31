import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Row,
  Col,
  Spin,
  Card,
  Modal,
  Button,
  Form,
  Input,
  List,
  Checkbox,
  Progress,
  Collapse,
  message,
  Space,
  Tooltip,
  Popconfirm,
} from "antd";
import { useRouter } from "next/router";
import Tabs, { TabPane } from "components/uielements/tabs";
import LayoutContentWrapper from "components/utility/layoutWrapper";
import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import PageHeader from "components/utility/pageHeader";

import { useUser } from "utils/hooks";
import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import basicStyle from "assets/styles/constants";

import {
  EyeOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { rowStyle, colStyle } = basicStyle;
const { Panel } = Collapse;
const { TextArea } = Input;

const initialState = {
  teamName: "",
  description: "",
  members: [],
};

const addNewTeamButtonStyle = {
  flexDirection: "row-reverse",
  display: "flex",
  width: "100%",
  margin: "0 20px 10px 0",
};

const TeamsTable = ({ teamsList, usersList }) => {
  const [user] = useUser();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [newTeamData, setNewTeamData] = useState(initialState);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);

  const onViewTeamProfile = (teamId) => {
    router.replace(`/dashboard/teams/${teamId}`);
  };

  const onReload = () => {
    router.push("/dashboard/teams");
    setNewTeamData(initialState);
  };

  const displayModal = (type) => {
    setVisible(true);
  };

  const onAddNewTeam = async () => {
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTeamData),
    });
    if (res.status === 201) {
      message.success("Team succesfully Added!");
      onReload();
    } else {
      message.error("Ooops... something went wrong!");
    }
    setVisible(false);
  };

  const onDeleteTeam = async (teamId) => {
    const res = await fetch(`/api/teams/${teamId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 204) {
      message.success("Team succesfully deleted!");
      TeamsTable.getInitialProps();
      onReload();
    } else {
      message.error("Ooops! Something went wrong!");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSelectUser = (userId) => {
    let newState = Object.assign({}, newTeamData);
    let newSelectedUserList = [];
    if (!newTeamData.members.includes(userId)) {
      newSelectedUserList = newTeamData.members.concat(userId);
    }
    newState.members = newSelectedUserList;
    setNewTeamData(newState);
  };

  const renderCompetencyLevel = (user) => {
    if (user.competencies && user.competencies.length > 0) {
      return user.competencies.map((competency) => {
        return (
          <span>
            <p>{competency.title}</p>
            <Progress percent={competency.competencyScore} size="small" />
          </span>
        );
      });
    }
    return <p>User has no competency quizzes started.</p>;
  };

  const handleOnChange = (e) => {
    e.persist();
    setNewTeamData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      {user && teamsList.data ? (
        <DashboardLayout>
          <LayoutContentWrapper>
            <PageHeader>Teams</PageHeader>

            {user.userRole === "Manager" && (
              <Row style={addNewTeamButtonStyle} justify="start">
                <Button type="primary" onClick={() => displayModal()}>
                  Add Team
                </Button>
              </Row>
            )}

            <Row style={rowStyle} gutter={10} justify="start">
              {teamsList.data.map((team, idx) => (
                <Col lg={12} md={12} sm={12} xs={24} style={colStyle} key={idx}>
                  <Card
                    title={team.teamName}
                    extra={
                      <Space size="middle">
                        <Tooltip title="View Team">
                          <EyeOutlined
                            key={`${team._id}_view`}
                            onClick={() => onViewTeamProfile(team._id)}
                          />
                        </Tooltip>
                        {user.userRole === "Manager" && (
                          <Tooltip title="Delete Team">
                            <Popconfirm
                              title={`You really want to delete ${team.teamName} team?`}
                              placement="leftTop"
                              icon={
                                <QuestionCircleOutlined
                                  style={{ color: "red" }}
                                />
                              }
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => onDeleteTeam(team._id)}
                              key={`${team._id}_delete`}
                            >
                              <DeleteOutlined style={{ color: "#f83e46" }} />
                            </Popconfirm>
                          </Tooltip>
                        )}
                      </Space>
                    }
                  >
                    <p>{team.description}</p>
                    <p>Members: {team.members.length}</p>
                  </Card>
                </Col>
              ))}
            </Row>

            <Modal
              title="Create a new team"
              visible={visible}
              onOk={onAddNewTeam}
              okText="Create new team"
              onCancel={handleCancel}
            >
              <Form name="basic" layout={"vertical"}>
                <Form.Item
                  rules={[
                    { required: true, message: "You should add a name!" },
                  ]}
                >
                  <Input
                    placeholder="Team Name"
                    id="teamName"
                    name="teamName"
                    type="text"
                    onChange={handleOnChange}
                    value={newTeamData.teamName}
                  />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Describe what the team is about!",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Team Description"
                    id="description"
                    name="description"
                    type="text"
                    onChange={handleOnChange}
                    value={newTeamData.description}
                  />
                </Form.Item>
                <Collapse>
                  <Panel header="Select members to join this new team">
                    <List
                      itemLayout="horizontal"
                      dataSource={usersList.data}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Checkbox
                              onChange={() => onSelectUser(item._id)}
                            />,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <a href="">
                                {item.firstName} {item.lastName}
                              </a>
                            }
                            description={renderCompetencyLevel(item)}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                </Collapse>
              </Form>
            </Modal>
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
  const teamsUrl = buildUrl("/api/teams/all");
  const usersUrl = buildUrl("/api/user/all");

  const [teamsList, usersList] = await Promise.all([
    await fetch(teamsUrl).then((r) => r.json()),
    await fetch(usersUrl).then((r) => r.json()),
  ]);
  return { teamsList, usersList };
};

export default TeamsTable;
