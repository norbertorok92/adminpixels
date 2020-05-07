import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import Input from 'components/uielements/input';
import Button from 'components/uielements/button';
import ResetPasswordStyleWrapper from 'styled/ResetPassword.styles';

function ResetPassword() {
  return (
    <ResetPasswordStyleWrapper className="isoResetPassPage">
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
              Reset Password
            </h3>
            <p>
              Enter new password and confirm it.
            </p>
          </div>

          <div className="isoResetPassForm">
            <div className="isoInputWrapper">
              <Input size="large" type="password" placeholder="New Password" />
            </div>

            <div className="isoInputWrapper">
              <Input
                size="large"
                type="password"
                placeholder="Confirm Password"
              />
            </div>

            <div className="isoInputWrapper">
              <Button type="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ResetPasswordStyleWrapper>
  );
}

export default () => (
  <>
    <Head>
      <title>Reset Password</title>
    </Head>
    <ResetPassword />
  </>
);
