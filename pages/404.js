import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import FourZeroFourStyleWrapper from 'styled/404.styles';
import Image from 'assets/images/rob.png';
function FourZeroFour() {
  return (
    <FourZeroFourStyleWrapper className="iso404Page">
      <div className="iso404Content">
        <h1>
          404
        </h1>
        <h3>
          Looks like you got lost...
        </h3>
        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button type="button">
          <Link href="/dashboard">
            <a className="isoMenuHolder">
              <span className="nav-text">
                Bring me back
              </span>
            </a>
          </Link>
        </button>
      </div>

      <div className="iso404Artwork">
        <img alt="#" src={Image} />
      </div>
    </FourZeroFourStyleWrapper>
  );
}

export default () => (
  <>
    <Head>
      <title>404</title>
    </Head>
    <FourZeroFour />
  </>
);
