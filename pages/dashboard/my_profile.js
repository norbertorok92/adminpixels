import React, { useState, useEffect, useCallback } from 'react';
import Spin from 'UI/Antd/Spin/Spin';
import Modal from 'UI/Antd/Modal/Modal';
import Container from 'UI/UI/Container/Container';
import AvatarCard from 'components/AvatarCard/AvatarCard';
import Head from 'next/head';
import Posts from 'widgets/Profile/Posts/Posts';
import Followers from 'widgets/Profile/Followers/Followers';
import Following from 'widgets/Profile/Following/Following';
import Wrapper, {
  Banner,
  Navigation,
  ContentWrapper,
} from 'widgets/Profile/Profile.styles';
import { useSelector, useDispatch } from 'react-redux';
import profileActions from 'redux/profile/actions';
import DashboardLayout from 'widgets/DashboardLayout/DashboardLayout';
const MyProfile = () => {
  const data = useSelector(state => state.profile.data);
  const loading = useSelector(state => state.profile.loading);
  const dispatch = useDispatch();
  const getProfile = useCallback(
    () => dispatch(profileActions.fetchProfileDataStart()),
    [dispatch]
  );

  const [active, setActive] = useState('post');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleMenu = type => {
    if (type === 'post') {
      setActive(type);
    }
    if (type === 'followers') {
      setActive(type);
      setVisible(true);
    }
    if (type === 'following') {
      setActive(type);
      setVisible(true);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setActive('post');
  };

  return (
    <>
      <Head>
        <title>My profile</title>
      </Head>
      <DashboardLayout>
        <Wrapper>
          {loading !== true ? (
            <>
              <Banner
                className="profile-banner"
                style={{ backgroundImage: `url(${data.profile_bg})` }}
              >
                <Container className="container">
                  <AvatarCard
                    avatar={data.avatar}
                    name={data.name}
                    username={data.username}
                  />
                </Container>
              </Banner>

              <Navigation className="navigation">
                <Container className="container">
                  <ul className="profile-menu">
                    <li
                      className={active === 'post' ? 'active' : ''}
                      onClick={() => handleMenu('post')}
                    >
                      <strong>{data.post.length}</strong> Posts
                    </li>
                    <li
                      className={active === 'followers' ? 'active' : ''}
                      onClick={() => handleMenu('followers')}
                    >
                      <strong>{data.followers.length}</strong> Followers
                    </li>
                    <li
                      className={active === 'following' ? 'active' : ''}
                      onClick={() => handleMenu('following')}
                    >
                      <strong>{data.following.length}</strong> Following
                    </li>
                  </ul>
                </Container>
              </Navigation>

              <ContentWrapper>
                <Container className="container">
                  <Posts
                    avatar={data.avatar}
                    username={data.username}
                    data={data.post}
                  />
                  <Modal
                    wrapClassName="follow-modal"
                    visible={visible}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    {active === 'followers' && (
                      <Followers data={data.followers} />
                    )}
                    {active === 'following' && (
                      <Following data={data.following} />
                    )}
                  </Modal>
                </Container>
              </ContentWrapper>
            </>
          ) : (
            <div
              style={{
                minHeight: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spin />
            </div>
          )}
        </Wrapper>
      </DashboardLayout>
    </>
  );
};

export default MyProfile;
