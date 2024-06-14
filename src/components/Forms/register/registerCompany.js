import React from 'react'
import { useState, useMemo, useContext, useEffect } from 'react'
import { useRouter, usePathname} from 'next/navigation';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { AuthContext } from '../../../context/AuthContext'
import AuthService from '../../../services/AuthService'
import styles from "../signin/signinform.module.css";
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const RegisterForm2 = () => {
  const [inputtext, setinputtext] = useState({
    companyName: '',
    password: '',
    country: '',
    primaryInterest: '',
    companySize: '',
  })

  const router = useRouter();
  const location = usePathname();
  //country selector
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])
  const changeHandlerCountry = (value) => {
    setValue(value)
  }

  //select primary interests
  const [primaryInt, setPrimaryInt] = useState('')
  const changeHandlerPrimaryInt = (value) => {
    setPrimaryInt(value)
  }
  const primaryIntList = [
    { value: 'company', label: 'Use it in my company' },
    { value: 'student', label: 'I am a student' },
    { value: 'teacher', label: 'I am a teacher' },
    { value: 'others', label: 'Others' },
  ]

  //select company size
  const [companySize, setCompanySize] = useState('')
  const changeHandlerCompanySize = (value) => {
    setCompanySize(value)
  }
  const companySizeList = [
    { value: 'lessThan5', label: '< 5 employees' },
    { value: 'lessThan20', label: '5 - 20 employees' },
    { value: 'lessThan50', label: '20 - 50 employees' },
    { value: 'lessThan250', label: '50 - 250 employees' },
    { value: 'moreThan250', label: '> 250 employees' },
  ]

  const { setUser, setIsAuthenticated } = useContext(AuthContext)

  const inputEvent = (event) => {
    const name = event.target.name
    const value = event.target.value
    setinputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      }
    })
  }

  useEffect(() => {

    let formDataFromForm1 = "";
    if (typeof window !== "undefined") {
      formDataFromForm1 = JSON.parse(localStorage.getItem("formDataFromForm1"));
    }
    s
    if (formDataFromForm1) {
      setinputtext((lastValue) => ({
        ...lastValue,
        ...formDataFromForm1,
      }))
    }
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()

    try {
      const updatedInputText = {
        ...inputtext,
        country: value.label,
        primaryInterest: primaryInt.value,
        companySize: companySize.value,
      }

      const user = await AuthService.register(updatedInputText)

      if (user.isAuthenticated) {
        setUser(user.user) // Set user data in context
        setIsAuthenticated(true)

        const signInUser = await AuthService.login(inputtext)

        if (signInUser.isAuthenticated) {
          setUser(signInUser.user)
          setIsAuthenticated(true)
        }
        alert('Registration successful')
        router.push('/welcome')
        setTimeout(() => {
          router.push('/signin')
        }, 10000)
      } else {
        alert('Registration failed. Please check your input.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      alert('An error occurred during registration. Please try again later.')
    }
  }

  return (
    <div className={cx('signinCard')}>
      <div className={cx('text', 'myAuto')}>Register</div>
      <form onSubmit={submitForm}>
        <div className={cx('inputText')}>
          Company Name
          <input
            type="text"
            placeholder="Company Name"
            value={inputtext.companyName}
            onChange={inputEvent}
            name="companyName"
            required
          />
        </div>

        <div className={cx('inputText')}>
          Company Size
          <Select options={companySizeList} onChange={changeHandlerCompanySize} />
        </div>

        {/* <div className={cx('inputText')}>
                    Password
                    <input type={password} placeholder="Password" value={inputtext.password} onChange={inputEvent} name="password" required />

                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                </div>

                <div className={cx('inputText')}>
                    Confirm Password
                    <input type={cpassword} placeholder="Confirm Password" value={inputtext.cpassword} onChange={inputEvent} name="cpassword" required />

                    <i onClick={CEye} className={`fa ${ceye ? "fa-eye-slash" : "fa-eye"}`}></i>
                </div> */}

        <div className={cx('inputText')}>
          Country
          <Select options={options} onChange={changeHandlerCountry} />
        </div>

        <div className={cx('inputText')}>
          Primary Interest
          <Select options={primaryIntList} onChange={changeHandlerPrimaryInt} />
        </div>

        <div className={cx('buttons')}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm2
