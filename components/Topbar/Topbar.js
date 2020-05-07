import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import appActions from 'redux/app/actions';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  render() {
    const { toggleCollapsed } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'pixeladminTopbar collapsed' : 'pixeladminTopbar'
          }
        >
          <div className="isoLeft">
            <Button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              icon={<MenuOutlined />}
              onClick={toggleCollapsed}
              type="link"
            />
          </div>

          <ul className="isoRight">
            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  { toggleCollapsed }
)(Topbar);
