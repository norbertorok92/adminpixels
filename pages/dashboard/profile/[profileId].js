import React, {useEffect} from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";
import { Row, Col, Button, Space, Spin, Modal, Tabs, Progress, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import Container from './Container/Container';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import Navigation from './Profile.styles';

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";
import { useUser } from "utils/hooks";

const ProfilePage = ({userProfile}) => {
  const [user] = useUser();
  const router = useRouter();
  const {email, firstName, lastName, bio, competencies} = userProfile.data || {};
  const { TabPane } = Tabs;

  if (!user || !userProfile) {
    return (
      <div
        style={{
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin />
      </div>
    );
  }

  const renderCompetencyLevel = (competencies) => {
    if (competencies && competencies.length > 0) {
      return competencies.map((competency, index) => {
        if(competency.competencyScore !== 0) {
          return (
            <span key={`${competency.title}_${index}`}>
              <p>{competency.title}({competency.category.toUpperCase()})</p>
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
        <title>Profile</title>
      </Head>
      <DashboardLayout>
          {userProfile ? (
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
                </Row>
              </Container>

              <Navigation className="navigation">
                <Container className="container">

                  <Tabs defaultActiveKey="1" onChange={() => {}}>
                    <TabPane tab="About" key="1">
                      {bio || `Write something about yourself ${firstName}`}
                    </TabPane>
                    <TabPane tab="Competencies" key="2">
                      {renderCompetencyLevel(competencies)}
                    </TabPane>
                  </Tabs>

                </Container>
              </Navigation> 
            </>
          ) : (
            <div
              style={{
                minHeight: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spin />
            </div>
          )}
      </DashboardLayout>
    </>
  );
};

ProfilePage.getInitialProps = async ({ query }) => {
  const { profileId } = query;
  const url = buildUrl(`/api/user/${profileId}`);
  const res = await fetch(url);
  const userProfile = await res.json();
  return { userProfile };
};

export default ProfilePage;
