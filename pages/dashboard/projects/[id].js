import Head from 'next/head';
import CreateBoard from 'widgets/ScrumBoard/Board/BoardCreateOrUpdate/BoardCreateOrUpdate';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
import ModalRoot from 'widgets/ScrumBoard/rootModal';
import DrawerRoot from 'widgets/ScrumBoard/rootDrawer';

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

export default ProjectWithID
