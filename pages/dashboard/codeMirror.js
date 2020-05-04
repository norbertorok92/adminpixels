import Head from 'next/head';
import dynamic from 'next/dynamic';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';

const CodeMirror = dynamic(
  () => import('containers/AdvancedUI/CodeMirror/CodeMirror'),
  { ssr: false }
);

export default (() => (
  <>
    <Head>
      <title>Code Mirror</title>
    </Head>
    <DashboardLayout>
      <CodeMirror />
    </DashboardLayout>
  </>
));
