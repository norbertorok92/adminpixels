import React from 'react';
import Head from 'next/head';

import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
import Widgets from 'widgets/Widgets/Widgets';

export default (() => (
  <>
    <Head>
      <title>Home page</title>
    </Head>
    <DashboardLayout>
      <Widgets />
    </DashboardLayout>
  </>
));
