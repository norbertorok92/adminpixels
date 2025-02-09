import React from 'react';
import { Layout } from 'antd';

import Sidebar from 'components/Sidebar/Sidebar';
import Topbar from 'components/Topbar/Topbar';
import siteConfig from 'config/site.config';
import AppHolder from './DashboardLayout.styles';

const { Content, Footer } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <AppHolder>
      <Layout style={{ height: '100vh' }}>
        <Topbar />

        <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: 'calc(100vh - -70px)',
            }}
          >
            <Content
              className="pixeladminContent"
              style={{
                padding: '70px 0 0',
                flexShrink: '0',
                background: '#f1f3f6',
                width: '100%',
              }}
            >
              {children}
            </Content>
            <Footer
              style={{
                background: '#ffffff',
                textAlign: 'center',
                borderTop: '1px solid #ededed',
              }}
            >
              {siteConfig.footerText}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </AppHolder>
  );
}
