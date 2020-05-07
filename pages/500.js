import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import FiveZeroZeroStyleWrapper from 'styled/500.styles';
import Image from 'assets/images/rob.png';

function FiveHundred() {
  return (
    <FiveZeroZeroStyleWrapper className="iso500Page">
      <div className="iso500Content">
        <h1>
          500
        </h1>
        <h3>
          Internal Server Error
        </h3>
        <p>
          Something went wrong. Please try again later.
        </p>
        <button type="button">
          <Link href="/dashboard">
            <a className="isoMenuHolder">
              <span className="nav-text">
                BACK HOME
              </span>
            </a>
          </Link>
        </button>
      </div>

      <div className="iso500Artwork">
        <img alt="#" src={Image} />
      </div>
    </FiveZeroZeroStyleWrapper>
  );
}

export default () => (
  <>
    <Head>
      <title>500</title>
    </Head>
    <FiveHundred />
  </>
);
