import React, { useState } from "react";
import { Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUser } from "utils/hooks";
import Link from "next/link";

import TopbarDropdownWrapper from "./TopbarDropdown.styles";

export default function TopbarUser() {
  const [user, { mutate }] = useUser();
  const [visible, setVisibility] = useState(false);
  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const handleLogout = async () => {
    await fetch("/api/auth", {
      method: "DELETE",
    });
    // set the user state to null
    mutate(null);
  };

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link href="/dashboard/profile">
        <a className="isoDropdownLink">My Profile</a>
      </Link>
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
