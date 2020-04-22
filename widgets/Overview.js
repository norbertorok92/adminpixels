import React, { Component } from 'react';
import LayoutContentWrapper from 'components/utility/layoutWrapper';
import PageHeader from 'components/utility/pageHeader';
import IntlMessages from 'components/utility/intlMessages';

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <PageHeader>
          <IntlMessages id="sidebar.overview" />
        </PageHeader>
      </LayoutContentWrapper>
    );
  }
}
