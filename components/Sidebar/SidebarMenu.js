import React from 'react';
import Link from 'next/link';
import { HomeFilled, UserOutlined, TeamOutlined, SkinFilled, ProjectFilled, CalendarOutlined, ProfileOutlined, CheckCircleOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons';
import Menu from 'components/uielements/menu';
import siteConfig from 'config/site.config';
import IntlMessages from 'components/utility/intlMessages';

const SubMenu = Menu.SubMenu;

export default function SidebarMenu({
  item,
  submenuStyle,
  submenuColor,
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
      default:
        return <SmileOutlined />;
    }
  }

  if (children) {
    return (
      <SubMenu
        key={key}
        title={
          <span className="isoMenuHolder" style={submenuColor}>
            {returnIcon(leftIcon)}
            <span className="nav-text">
              <IntlMessages id={label} />
            </span>
          </span>
        }
        {...rest}
      >
        {children.map(({ key, label, withoutDashboard }) => {
          const linkTo = withoutDashboard ? `/${key}` : `${url}/${key}`;
          return (
            <Menu.Item style={submenuStyle} key={key}>
              <Link href={linkTo}>
                <a className="isoMenuHolder" style={submenuColor}>
                  <span className="nav-text">
                    <IntlMessages id={label} />
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
        <a className="isoMenuHolder" style={submenuColor}>
          {returnIcon(leftIcon)}
          <span className="nav-text">
            <IntlMessages id={label} />
          </span>
        </a>
      </Link>
    </Menu.Item>
  );
}
