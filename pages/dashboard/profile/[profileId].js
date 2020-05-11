import React from 'react';
import Head from 'next/head';
import { Row, Col, Button, Space, Spin, Modal, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import Container from './Container/Container';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import Navigation from './Profile.styles';

import fetch from "node-fetch";
import { buildUrl } from "utils/api-utils";

const ProfilePage = ({userProfile}) => {
  const {email, firstName, lastName, bio} = userProfile.data || {};
  const { TabPane } = Tabs;

  if (!userProfile) {
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

  return (
    <>
      <Head>
        <title>My profile</title>
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
                    <TabPane tab="Bio" key="1">
                      {bio || 'There is no bio yet.'}
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                      Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                      Content of Tab Pane 3
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
