"use client"
import React, { useState, useContext, useEffect } from 'react';
import router from 'next/navigation';
import { useRouter } from 'next/navigation'
import { AuthContext } from '../../../context/AuthContext';
import AuthService from '../../../services/AuthService';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import styles from './signinform.module.css'; // Import the CSS module

const SignIn = ({ onSignInSuccess, onCreateAccountClick  }) => {
  let isAuthenticated = "";
  if (typeof window !== "undefined") {
    isAuthenticated = localStorage.getItem("isAuthenticated") || "";
  }
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated && router.pathname === "/account/signin") {
      router.push("/");
    } 
  }, [isAuthenticated, router]);

  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState('password');
  const [type, settype] = useState(false);
  const [inputtext, setinputtext] = useState({
    email: '',
    password: '',
  });
  
  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const user = await AuthService.login(inputtext);

      if (user.isAuthenticated) {
        setUser(user.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', user.user.email);
        localStorage.setItem('userAvatar', user.user.avatar);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('userName', user.userName);
        localStorage.setItem('token', user.token);
        localStorage.setItem('isAdmin', user.isAdmin);

        onSignInSuccess(user);
        console.log('Login successful');
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  const Eye = () => {
    if (password === 'password') {
      setpassword('text');
      seteye(false);
      settype(true);
    } else {
      setpassword('password');
      seteye(true);
      settype(false);
    }
  };

  // const onCreateAccountClick = () => {
  //   if (router.pathname === '/formbuilder') {
  //     onCreateAccountClick();
  //   } else {
  //     router.push('/register');
  //   }
  // };

  return (
    <>
      <div className={styles.signin_card}>
        <div className={`${styles.text} my-auto`}>Sign In</div>
        <form onSubmit={submitForm}>
          <div className={styles['input-text']}>
            Email
            <input
              type="email"
              placeholder="Registered mail ID"
              value={inputtext.email}
              onChange={inputEvent}
              name="email"
              required
              className={styles.input}
            />
          </div>
          <div className={styles['input-text']}>
            Password
            <input
              type={password}
              placeholder="Password"
              value={inputtext.password}
              onChange={inputEvent}
              name="password"
              required
              className={styles.input}
            />
            <i onClick={Eye} className={`fa ${eye ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </div>
          <div className={styles.forgot}>
            <a href="/forgotpass">Forgot password? </a>
          </div>

          <div className={styles.buttons}>
            <button type="submit">Sign in</button>
          </div>
        </form>
        <div className={styles.createAccount}>
          Not registered yet?
          {router.pathname === '/formbuilder' ? (
            <span className={styles.createAccountSpan} onClick={onCreateAccountClick}>Create account</span>
          ) : (
            <a href="/account/register" className={styles.createAccountSpan}>Create account</a>
          )}
        </div>
        <hr />

        {/* Google Login */}
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

              const googleSignInFlag = true;
              const email = credentialResponseDecoded.email;

              const user = await AuthService.loginWithGoogle({
                googleSignIn: googleSignInFlag,
                email,
              });

              if (user.isAuthenticated) {
                setUser(user.user);
                setIsAuthenticated(true);
                localStorage.setItem('user', user.user.email);
                localStorage.setItem('userAvatar', user.user.avatar);
                localStorage.setItem('isAuthenticated', true);
                localStorage.setItem('userName', user.userName);
                localStorage.setItem('token', user.token);
                localStorage.setItem('isAdmin', user.isAdmin);
                onSignInSuccess(user);
                console.log('Login successful');
              } else {
                alert('Google Authentication failed');
              }
            } catch (error) {
              console.error('Error during Google sign-in:', error);
              alert('An error occurred during Google sign-in. Please try again later.');
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          clientId="1048959371461-1m6g7k3vq8g6r4n2g3p3g6k0p3n2h3.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          className={styles['google-btn']}
        />
      </div>
    </>
  );
};

export default SignIn;
