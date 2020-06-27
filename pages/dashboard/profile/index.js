import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  Button,
  Space,
  Spin,
  Modal,
  Tabs,
  Progress,
  Divider,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

import DashboardLayout from "components/DashboardLayout/DashboardLayout";
import Container from "./Container/Container";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import EditModal from "./EditModal/EditModal";
import Navigation from "./Profile.styles";

import { useUser } from "utils/hooks";

const ProfilePage = () => {
  const [user] = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

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

  const { email, firstName, lastName, bio, competencies } = user || {};
  const { TabPane } = Tabs;

  const displayModal = (type) => {
    if (type === "editModal") {
      setVisible(true);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const renderCompetencyLevel = (competencies) => {
    if (competencies && competencies.length > 0) {
      return competencies.map((competency, index) => {
        if (competency.competencyScore !== 0) {
          return (
            <span key={`${competency.title}_${index}`}>
              <p>
                {competency.title}({competency.category.toUpperCase()})
              </p>
              <Progress percent={competency.competencyScore} size="small" />
              <Divider />
            </span>
          );
        }
      });
    }
    return <p>No competencies started</p>;
  };

  return (
    <>
      <Head>
        <title>My profile</title>
      </Head>
      <DashboardLayout>
        <>
          <Container className="container">
            <Row justify="space-around" align="middle">
              <Col xs={24} sm={24} md={20}>
                <ProfileDetails
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                />
              </Col>
              <Col xs={24} sm={24} md={4}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => displayModal("editModal")}
                >
                  Edit Profile
                </Button>
              </Col>
            </Row>
          </Container>

          <Navigation className="navigation">
            <Container className="container">
              <Tabs defaultActiveKey="1">
                <TabPane tab="About" key="1">
                  {bio || `Write something about yourself ${firstName}`}
                </TabPane>
                <TabPane tab="Competencies" key="2">
                  {renderCompetencyLevel(competencies)}
                </TabPane>
              </Tabs>
            </Container>
          </Navigation>
          <EditModal
            data={user}
            visible={visible}
            handleCancel={handleCancel}
          />
        </>
      </DashboardLayout>
    </>
  );
};

export default ProfilePage;
