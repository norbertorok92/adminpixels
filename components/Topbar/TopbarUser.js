import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useUser } from 'utils/hooks';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Popover from 'components/uielements/popover';
import TopbarDropdownWrapper from './TopbarDropdown.styles';

import userpic from 'assets/images/user1.png';

export default function TopbarUser() {
  const [user, { mutate }] = useUser();
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    // set the user state to null
    mutate(null);
  };

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <a className="isoDropdownLink">My Profile</a>
      <a className="isoDropdownLink">Settings</a>
      <a className="isoDropdownLink" onClick={() => handleLogout()}>
        Logout
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <Avatar size="large" icon={<UserOutlined />} />
    </Popover>
  );
}
