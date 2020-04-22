import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Actions from 'redux/themeSwitcher/actions';
import LayoutContentWrapper from 'components/utility/layoutWrapper';
import PageHeader from 'components/utility/pageHeader';
import IntlMessages from 'components/utility/intlMessages';
import Box from 'components/utility/box';
import ColorSwitcher from 'components/ColorSwitcher/ColorSwitcher';
import LanguageSwitcher from 'containers/LanguageSwitcher/LanguageSwitcher';
import ContentHolder from 'components/utility/contentHolder';
import Themes from './config';
import basicStyle from 'assets/styles/constants';
import SettingsStyle from './Settings.styles';

const { switchActivation, changeTheme } = Actions;

export default function Settings() {
    
    const { isActivated, topbarTheme, sidebarTheme, layoutTheme } = useSelector(
      state => state.ThemeSwitcher
    );
    const dispatch = useDispatch();
    const styleButton = { background: sidebarTheme.buttonColor };
    const { rowStyle, colStyle, gutter } = basicStyle;
    
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <PageHeader>
          <IntlMessages id="sidebar.settings" />
        </PageHeader>

        <SettingsStyle className="isoThemeSwitcher">
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
              <Box>
                <ContentHolder>
                  <div className="SwitcherBlockWrapper">
                    <ColorSwitcher
                      config={Themes.sidebarTheme}
                      changeTheme={(attr, theme) => dispatch(changeTheme(attr, theme))}
                      selectedId={sidebarTheme.themeName}
                    />

                    <ColorSwitcher
                      config={Themes.topbarTheme}
                      changeTheme={(attr, theme) => dispatch(changeTheme(attr, theme))}
                      selectedId={topbarTheme.themeName}
                    />

                    <ColorSwitcher
                      config={Themes.layoutTheme}
                      changeTheme={(attr, theme) => dispatch(changeTheme(attr, theme))}
                      selectedId={layoutTheme.themeName}
                    />
                    <LanguageSwitcher />
                  </div>
                </ContentHolder>
              </Box>
            </Col>

            <Col lg={16} md={12} sm={12} xs={24} style={colStyle}>
              <Box>
                <ContentHolder>
                  
                </ContentHolder>
              </Box>
            </Col>
          </Row>

        </SettingsStyle>
      </LayoutContentWrapper>
    );
}
