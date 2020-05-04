import React from 'react';
import { useUser } from 'utils/hooks';

const IndexPage = () => {
  const [user] = useUser();

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
        `}
      </style>
      <div>
        <h2>
          Hello,
          {' '}
          {user ? user.firstName : 'stranger'}
          !
        </h2>
        <p>Have a wonderful day.</p>
      </div>
    </>
  );
};
export default IndexPage;