import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Modal,
  List,
  Progress,
  message,
  Checkbox
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

const AddNewMembersModal = ({visible, handleCancel, usersList, teamId}) => {
  const router = useRouter();
  const [state, setState] = useState({
    addNewMemberModal: false,
    selectedUserList: []
  });

  const renderCompetencyLevel = (user) => {
    if (user.competencies && user.competencies.length > 0) {
      return user.competencies.map(competency => {
        return (
          <span>
            <p>{competency.title}</p>
            <Progress percent={competency.competencyScore} size="small" />
          </span>
        )
      })
    }
    return (
      <p>User has no competency quizzes started.</p>
    )
  }

  const onSelectUser = userId => {
    let newSelectedUserList = []
    if (!state.selectedUserList.includes(userId)) {
      newSelectedUserList = state.selectedUserList.concat(userId)
    }
    setState({
      selectedUserList: newSelectedUserList
    })
  }

  const handleOk = async () => {
    const res = await fetch('/api/teams', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId: teamId,
        usersList: state.selectedUserList
      }),
    });
    if (res.status === 200) {
      message.success('User(s) succesfully added to the team!');
      onReload()
    } else {
      message.error('Ooops! Something went wrong!')
    }
    handleCancel()
  }
  const onReload = () => {
    router.reload(`/dashboard/teams/${teamId}`);
  }

  return (
    <Modal
      title="Add New Members"
      visible={visible}
      onOk={handleOk}
      okText="Add to team"
      onCancel={handleCancel}
    >
      <List
        itemLayout="horizontal"
        dataSource={usersList}
        renderItem={(item) => (
          <List.Item actions={[<Checkbox onChange={() => onSelectUser(item._id)} />]}>
            <List.Item.Meta
              title={<a href="">{item.firstName} {item.lastName}</a>}
              description={renderCompetencyLevel(item)}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default AddNewMembersModal;
