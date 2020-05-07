import React,  {useState, useEffect} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from 'utils/hooks';

import Input from 'components/uielements/input';
import Button from 'components/uielements/button';
import IntlMessages from 'components/utility/intlMessages';

import SignInStyleWrapper from 'styled/SignIn.styles';


export default function SignIn() {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [credentials, setCredentials] = useState(
    {
      email: "",
      password: ""
    }
  );

  useEffect(() => {
    if (user) {
      router.replace('/dashboard')
    };
  }, [user]);

  const handleOnChange = (e) => {
    e.persist();
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  };

  return (
    <>
      <Head>
        <title>Sign In to AdminPixel</title>
      </Head>
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link href="/dashboard">
                <a>
                  <IntlMessages id="page.signInTitle" />
                </a>
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input
                  id="email"
                  name="email"
                  size="large"
                  type="text"
                  placeholder="Email"
                  onChange={handleOnChange}
                  value={credentials.email}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  id="password"
                  name="password"
                  size="large"
                  type="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                  value={credentials.password}
                />
              </div>

              {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
              <div className="isoInputWrapper">
                <Button type="primary" onClick={() => handleLogin()}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>

              <p className="isoHelperText">
                This is a helptext
              </p>

              <div className="isoCenterComponent isoHelperWrapper">
                <Link href="/forgotpassword">
                  <div className="isoForgotPass">
                    <IntlMessages id="page.signInForgotPass" />
                  </div>
                </Link>
                <Link href="/signup">
                  <a>
                    <IntlMessages id="page.signInCreateAccount" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    </>
  );
}
