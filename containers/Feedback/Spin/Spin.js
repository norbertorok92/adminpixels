import React from 'react';
import { Row, Col } from 'antd';
import Alert from 'components/Feedback/Alert';
import Switch from 'components/uielements/switch';
import PageHeader from 'components/utility/pageHeader';
import Box from 'components/utility/box';
import LayoutWrapper from 'components/utility/layoutWrapper';
import ContentHolder from 'components/utility/contentHolder';
import IntlMessages from 'components/utility/intlMessages';
import basicStyle from 'assets/styles/constants';
import Spin from './Spin.styles';

export default function() {
  const [loading, setLoading] = React.useState(false);
  const toggle = value => {
    setLoading(value);
  };
  const container = (
    <Alert
      message={<IntlMessages id="feedback.alert.spin.alertTitle" />}
      description={<IntlMessages id="feedback.alert.spin.alertDescription" />}
      type="info"
    />
  );
  const style = {
    textAlign: 'center',
    background: '#f1f3f6',
    padding: '30px 50px',
  };

  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="feedback.alert.spin" />}</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box title={<IntlMessages id="feedback.alert.spin.basicTitle" />}>
            <ContentHolder>
              <Spin size="small" />
              &nbsp;&nbsp;&nbsp;
              <Spin />
              &nbsp;&nbsp;&nbsp;
              <Spin size="large" />
              &nbsp;&nbsp;&nbsp;
            </ContentHolder>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box title={<IntlMessages id="feedback.alert.spin.background" />}>
            <ContentHolder>
              <div style={style}>
                <Spin />
              </div>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={
              <IntlMessages id="feedback.alert.spin.backgroundDescription" />
            }
          >
            <ContentHolder>
              <div style={{ marginBottom: '20px' }}>
                <Spin spinning={loading}>{container}</Spin>
              </div>
              {<IntlMessages id="feedback.alert.spin.loadingState" />}
              <Switch checked={loading} onChange={toggle} />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
