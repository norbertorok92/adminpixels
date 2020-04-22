import React from 'react';
import { Row, Col } from 'antd';
import LayoutWrapper from 'components/utility/layoutWrapper';
import PageHeader from 'components/utility/pageHeader';
import ContentHolder from 'components/utility/contentHolder';
import Box from 'components/utility/box';
import basicStyle from 'assets/styles/constants';
import BasicMap from './Maps/Basic';
import BasicMarker from './Maps/BasicMarker';
import IntlMessages from 'components/utility/intlMessages';
import NoAPIKey from 'components/utility/noApiKey';
import googleConfig from 'config/google_map.config';

// import GeoLocationMap from './maps/geoLoacations';

export default function GoogleMap() {
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      <PageHeader>Google Map</PageHeader>
      {googleConfig.apiKey ? (
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box title={<IntlMessages id="Map.leaflet.basicTitle" />}>
              <ContentHolder>
                <BasicMap />
              </ContentHolder>
            </Box>
          </Col>
          <Col md={12} sm={12} xs={24} style={colStyle}>
            <Box
              title={<IntlMessages id="Map.leaflet.leafletCustomMarkerTitle" />}
            >
              <ContentHolder>
                <BasicMarker />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      ) : (
        <NoAPIKey />
      )}
    </LayoutWrapper>
  );
}
