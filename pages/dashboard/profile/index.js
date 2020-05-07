import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';

import { Row, Col, Button, Space, Spin, Modal, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import DashboardLayout from 'components/DashboardLayout/DashboardLayout';
import Container from './Container/Container';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import EditModal from './EditModal/EditModal';
import Navigation from './Profile.styles';

import { useUser } from 'utils/hooks';

const ProfilePage = () => {
  const [user] = useUser();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const {email, firstName, lastName, bio} = user || {};
  const { TabPane } = Tabs;

  const displayModal = type => {
    if (type === 'editModal') {
      setVisible(true);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  if (!user) {
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
          {user ? (
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
                    <Button type="primary" icon={<EditOutlined />} onClick={() => displayModal('editModal')}>
                      Edit Profile
                    </Button>
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
                <EditModal data={user} visible={visible} handleCancel={handleCancel} />
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

export default ProfilePage;
