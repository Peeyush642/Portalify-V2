"use client"

import React, { useState, useContext } from 'react';
import { useRouter, usePathname} from 'next/navigation';
import Select from 'react-select';
import { AuthContext } from '../../../context/AuthContext';
import AuthService from '../../../services/AuthService';
import styles from "../signin/signinform.module.css";


const RegisterForm = ({ onNextClick }) => {
  const [inputtext, setinputtext] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    registrationType: '',
  });

  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState('password');
  const [type, settype] = useState(false);
  const router = useRouter();
  const location = usePathname();

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputtext((lastValue) => ({
      ...lastValue,
      [name]: value,
    }));
  };

  const [rType, setRType] = useState('');

  const changeHandlerRType = (value) => {
    setRType(value);
    setinputtext((lastValue) => ({
      ...lastValue,
      registrationType: value.label,
    }));
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

  const rTypeList = [
    { value: 'PartnershipFirm', label: 'Company' },
    { value: 'sample2', label: 'Individual' },
    { value: 'sample3', label: 'Student' },
    { value: 'sample3', label: 'Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rType && rType.value === 'PartnershipFirm') {
        // Save the data locally and pass it to another form
        localStorage.setItem('formDataFromForm1', JSON.stringify(inputtext))
        if (location.pathname === '/formbuilder') {
          onNextClick(); // Trigger the next action
        } else {
          router.push('/register_company'); // Navigate to the next form
        }
      } else {
        try {
          const user = await AuthService.register(inputtext) // Register the user
  
          if (user.isAuthenticated) {
            setUser(user.user) // Set user data in context
            setIsAuthenticated(true) // Set authentication status in context
  
            const signInUser = await AuthService.login({ email: inputtext.email, password: inputtext.password })
  
            if (signInUser.isAuthenticated) {
              setUser(signInUser.user)
              setIsAuthenticated(true)
            }
  
            alert('Registration successful')
            router.push('/welcome')
            setTimeout(() => {
              router.push('/')
            }, 5000)
            console.log('Registration successful')
          } else {
            alert('Registration failed. Please check your input.')
          }
        } catch (error) {
          console.error('Error during registration:', error)
          alert(error.response.data.message)
        }
    }
  };

  return (
    <div className={styles.signin_card}>
    <div className={`${styles.text} ${styles['my-auto']}`}>Register</div>
    <form onSubmit={handleSubmit}>
      {/* Input fields for RegisterForm */}
      {/* First Name */}
      <div className={styles['input-text']}>
        First Name
        <input
          type="text"
          placeholder="First Name"
          value={inputtext.firstname}
          onChange={inputEvent}
          name="firstname"
          required
          className={styles.input}
        />
      </div>

      {/* Last Name */}
      <div className={styles['input-text']}>
        Last Name
        <input
          type="text"
          placeholder="Last Name"
          value={inputtext.lastname}
          onChange={inputEvent}
          name="lastname"
          className={styles.input}
        />
      </div>

      {/* Email ID */}
      <div className={styles['input-text']}>
        Email ID
        <input
          type="text"
          placeholder="Email ID"
          value={inputtext.email}
          onChange={inputEvent}
          name="email"
          required
          className={styles.input}
        />
      </div>

      {/* Password */}
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

      {/* Registration Type */}
      <div className={styles['input-text']}>
        Registration Type *
        <Select options={rTypeList} value={rType} onChange={changeHandlerRType} className={styles.input} />
      </div>

      {/* Button based on registration type */}
      {rType && rType.value === 'PartnershipFirm' ? (
        <div className={styles['buttons']}>
          <button type="submit">Next</button>
        </div>
      ) : (
        <div className={styles['buttons']}>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  </div>
  );
};

export default RegisterForm;
