import Head from 'next/head';
import CreateBoard from 'containers/ScrumBoard/Board/BoardCreateOrUpdate/BoardCreateOrUpdate';
import { withAuthSync } from 'authentication/auth.utils';
import DashboardLayout from 'containers/DashboardLayout/DashboardLayout';
import ModalRoot from 'containers/ScrumBoard/rootModal';
import DrawerRoot from 'containers/ScrumBoard/rootDrawer';

import { useRouter } from 'next/router'

const ProjectWithID = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>Board #{id}</title>
      </Head>
      <DashboardLayout>
        <CreateBoard boardId={id} />
        <ModalRoot />
        <DrawerRoot />
      </DashboardLayout>
    </>
  )
};

export default withAuthSync(ProjectWithID)
