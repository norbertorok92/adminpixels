import Head from 'next/head';

import React from 'react';
import Link from 'next/link';
import Input from 'components/uielements/input';
import Button from 'components/uielements/button';
import ForgotPasswordStyleWrapper from 'styled/ForgotPassword.styles';

function ForgotPassword() {
  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        <div className="isoFormContent">
          <div className="isoLogoWrapper">
            <Link href="/dashboard">
              <a className="isoMenuHolder">
                <span className="nav-text">
                  AdminPixel
                </span>
              </a>
            </Link>
          </div>

          <div className="isoFormHeadText">
            <h3>
              Forgot Password? It could happen to anyone, don't worry.
            </h3>
            <p>
              Enter your email and we send you a reset link.
            </p>
          </div>

          <div className="isoForgotPassForm">
            <div className="isoInputWrapper">
              <Input size="large" placeholder="Email" />
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">
                Send request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ForgotPasswordStyleWrapper>
  );
}

export default () => (
  <>
    <Head>
      <title>Forgot Password</title>
    </Head>
    <ForgotPassword />
  </>
);
