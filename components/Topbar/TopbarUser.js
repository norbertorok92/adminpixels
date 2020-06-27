import React, { useState } from "react";
import { Avatar, Popover, Typography, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUser } from "utils/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

import TopbarDropdownWrapper from "./TopbarDropdown.styles";

const { Text } = Typography;

export default function TopbarUser() {
  const router = useRouter();
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
    router.replace("/signin");
    mutate(null);
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

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Text strong> <a className="isoDropdownLink">Logged in as: {user.firstName}</a></Text>
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
