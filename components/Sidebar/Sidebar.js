import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Menu } from 'antd';

import appActions from 'redux/app/actions';
import Logo from './Logo';
import SidebarWrapper from './Sidebar.styles';
import SidebarMenu from './SidebarMenu';
import SIDEBAR_MENU_OPTIONS from './sidebar.navigations';

const { Sider } = Layout;
const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;
export default function Sidebar(props) {
  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    // height,
    current,
  } = useSelector(state => state.App);

  const dispatch = useDispatch();
  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
      }, 100);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      key => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? 'vertical' : 'inline';
  const onMouseEnter = () => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  
  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="pixeladminSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Logo collapsed={isCollapsed} />
        <Scrollbars style={{ height: `100vh` }}>
          <Menu
            onClick={handleClick}
            theme="dark"
            mode={mode}
            openKeys={isCollapsed ? [] : openKeys}
            selectedKeys={current}
            onOpenChange={onOpenChange}
            className="isoDashboardMenu"
          >
            {SIDEBAR_MENU_OPTIONS.map(option => (
              <SidebarMenu
                key={option.key}
                item={option}
              />
            ))}
          </Menu>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
