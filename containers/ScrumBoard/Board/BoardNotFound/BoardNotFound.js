import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { Wrapper, Title, Text, Icon } from './NoBoardFounds.style';
import emptyProjectPlaceHolder from 'assets/images/icon/12.svg';

export default function NoBoardFounds() {
  const router = useRouter();
  return (
    <Wrapper>
      <Icon src={emptyProjectPlaceHolder} />
      <Title>You Currently have no projects</Title>
      <Text>Let's Create your first project in AdminPixels</Text>
      <Button type="primary" onClick={() => router.push('/dashboard/projects/new')}>
        Create Project
      </Button>
    </Wrapper>
  );
}
