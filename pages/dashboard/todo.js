import Head from 'next/head';
import Todo from 'widgets/Todo/Todo';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

export default (() => (
  <>
    <Head>
      <title>Todo</title>
    </Head>
    <DashboardLayout>
      <Todo />
    </DashboardLayout>
  </>
));
