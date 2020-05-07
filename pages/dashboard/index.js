import React from 'react';
import Head from 'next/head';
import GoogleChart from 'containers/Charts/GoogleChart/GoogleChart';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>Home page</title>
    </Head>
    <DashboardLayout>
      <GoogleChart />
    </DashboardLayout>
  </>
));
