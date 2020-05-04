import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from 'utils/hooks';

import Input from 'components/uielements/input';
import Button from 'components/uielements/button';
import IntlMessages from 'components/utility/intlMessages';

import SignUpStyleWrapper from 'styled/SignUp.styles';

export default function SignUp() {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [credentials, setCredentials] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  );

  useEffect(() => {
    // redirect to dashboard if user is authenticated
    if (user) router.replace('/dashboard');
  }, [user]);

  const handleOnChange = (e) => {
    e.persist();
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up to AdminPixel</title>
      </Head>
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link href="/dashboard">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input size="large" id="firstName" name="firstName" type="text" onChange={handleOnChange} value={credentials.firstName} placeholder="First name" />
                <Input size="large" id="lastName" name="lastName" type="text" onChange={handleOnChange} value={credentials.lastName} placeholder="Last name" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" id="email" name="email" type="email" onChange={handleOnChange} value={credentials.email} placeholder="Email" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" id="password" name="password" type="password" onChange={handleOnChange} value={credentials.password} placeholder="Password" />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" id="confirmPassword" name="confirmPassword" type="password" onChange={handleOnChange} value={credentials.confirmPassword} placeholder="Confirm Password" />
              </div>

              {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}

              <div className="isoInputWrapper">
                <Button type="primary" onClick={() => handleSignup()}>
                  <IntlMessages id="page.signUpButton" />
                </Button>
              </div>

              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link href="/signin">
                  <a>
                    <IntlMessages id="page.signUpAlreadyAccount" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    </>
  );
}
