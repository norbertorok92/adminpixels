import React from 'react';
import Tabs, { TabPane } from 'components/uielements/tabs';
import LayoutContentWrapper from 'components/utility/layoutWrapper';
import PageHeader from 'components/utility/pageHeader';
import IntlMessages from 'components/utility/intlMessages';
import EditView from './TableViews/EditView';
import fakeData from './data';
import { tableinfos } from './configs';
import TableDemoStyle from './Demo.styles';

const dataList = new fakeData(10);

export default function TeamsTable() {
  function renderTable(tableInfo) {
    return <EditView tableInfo={tableInfo} dataList={dataList} />;
  }
  
  return (
    <LayoutContentWrapper>
       <PageHeader>
          <IntlMessages id="sidebar.teams" />
        </PageHeader>
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableinfos)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { tableinfos, dataList };
