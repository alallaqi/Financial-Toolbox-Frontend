import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

const AuthPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [alert, setAlert] = useState('');

  const router = useRouter(); // This is used for redirecting after successful login/signup

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await axios.get('https://source.unsplash.com/random');
        setBackgroundImage(response.config.url);
      } catch (error) {
        console.error('Error fetching background image:', error);
        setBackgroundImage('/fallback-background-image.jpg'); // Set a fallback image
      }
    };

    fetchBackgroundImage();
  }, [isSignUp]);

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Sending request with:', formState);
    const url = isSignUp ? 'http://localhost:3001/api/users/register' : 'http://localhost:3001/api/users/login';
    
    try {
      const response = await axios.post(url, formState);
      const { token } = response.data;
      console.log('Response:', response.data.token);
      localStorage.setItem('token', token);  // Store the token in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;  // Set the default header
      setAlert(response.data.message);
      router.push('/Restrictedhome'); // Redirect to a dashboard or another page on success
    } catch (error) {
      console.error('There was an error!', error);
      setAlert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from storage
    delete axios.defaults.headers.common['Authorization']; // Remove the auth header
    router.push('/login'); // Redirect to login page
  };
  return (
    <div className={styles.authContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
      {alert && <div className={styles.alert}>{alert}</div>}
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          {/* Placeholder for logo */}
          <span className={styles.logo}></span>
        </div>
        <h1 className={styles.header}>{isSignUp ? 'Create an account' : 'Sign in'}</h1>
        {isSignUp && (
          <p className={styles.switchModeText}>
            Already have an account? <span className={styles.switchModeLink} onClick={() => setIsSignUp(false)}>Sign in</span>
          </p>
        )}
        {!isSignUp && (
          <p className={styles.switchModeText}>
            New user? <span className={styles.switchModeLink} onClick={() => setIsSignUp(true)}>Create an account</span>
          </p>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          {isSignUp && (
            <div className={styles.inputContainer}>
              <label htmlFor="username" className={styles.label}>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className={styles.input}
                value={formState.username}
                onChange={handleInputChange}
                required={isSignUp}
              />
            </div>
          )}
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formState.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={formState.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            {isSignUp ? 'Register' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
