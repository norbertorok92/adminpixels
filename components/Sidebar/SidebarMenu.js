import React from 'react';
import Link from 'next/link';
import { HomeFilled, UserOutlined, TeamOutlined, SkinFilled, SmileOutlined, DashboardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import siteConfig from 'config/site.config';

const SubMenu = Menu.SubMenu;

export default function SidebarMenu({
  item,
  ...rest
}) {
  const { key, label, leftIcon, children } = item;

  const url = siteConfig.dashboard;

  const returnIcon = leftIcon => {
    switch(leftIcon) {
      case 'home':
        return <HomeFilled />
      case 'user':
        return <UserOutlined />
      case 'people':
        return <TeamOutlined />
      case 'teams':
        return <SkinFilled />
      case 'quiz':
        return <DashboardOutlined />
      default:
        return <SmileOutlined />;
    }
  }

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder">
            {returnIcon(leftIcon)}
            <span className="nav-text">
              {label}
            </span>
          </span>
        }
        {...rest}
      >
        {children.map(({ key, label, withoutDashboard }) => {
          const linkTo = withoutDashboard ? `/${key}` : `${url}/${key}`;
          return (
            <Menu.Item key={key}>
              <Link href={linkTo}>
                <a className="isoMenuHolder">
                  <span className="nav-text">
                    {label}
                  </span>
                </a>
              </Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item key={key} {...rest}>
      <Link href={`${url}/${key}`}>
        <a className="isoMenuHolder">
          {returnIcon(leftIcon)}
          <span className="nav-text">
            {label}
          </span>
        </a>
      </Link>
    </Menu.Item>
  );
}
