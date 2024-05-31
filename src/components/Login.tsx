import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [state, setState] = useState<LoginState>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: "post",
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/');
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to login. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGoogleLogin = async () => {
    try {
      window.open(
        `${process.env.REACT_APP_API_URL}/auth/google`,
        "_self"
      );
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Failed to login with Google. Please try again later.");
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      window.open(
        `${process.env.REACT_APP_API_URL}/auth/microsoft`,
        "_self"
      );
    } catch (error) {
      console.error("Error during Microsoft login:", error);
      alert("Failed to login with Microsoft. Please try again later.");
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <input
        className="inputBox"
        type="text"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        className="inputBox"
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
      <button onClick={handleGoogleLogin} className="appButton" type="button">
        Login with Google
      </button>
      <button onClick={handleMicrosoftLogin} className="appButton" type="button">
        Login with Microsoft
      </button>
    </div>
  );
};

export default Login;
