import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Radio, Modal, message } from 'antd';
import Wrapper, { FollowerList, ListItem } from './EditModal.styles';
import { useUser } from 'utils/hooks';

const EditModal = ({ data, visible, handleCancel }) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [user, { mutate }] = useUser();
  const [profileData, setProfileData] = useState(
    {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      bio: data.bio || ""
    }
  );
  
  const handleOnChange = (e) => {
    e.persist();
    setProfileData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    const res = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      success()
    } else {
      error()
    }
    handleCancel()
  };

  const success = () => {
    message.success('Profile succesfully updated');
  };

  const error = () => {
    message.error('Ooops! Something went wrong!');
  };


  return (
     <Modal
      wrapClassName="follow-modal"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleUpdate}
      okText={'Update'}
      width={700}
    >
      <Wrapper>
        <h3>Edit Profile</h3>
        <Form
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name">
                <Input
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={handleOnChange}
                  value={profileData.firstName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name">
                <Input
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={handleOnChange}
                  value={profileData.lastName}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Bio">
                <TextArea
                  placeholder="Bio"
                  id="bio"
                  name="bio"
                  type="text"
                  onChange={handleOnChange}
                  value={profileData.bio}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default EditModal;
