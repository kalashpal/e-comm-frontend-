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
  });

  const handleLogin = async () => {
    console.warn(state.email, state.password);
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify(state),
        headers: {
          'content-type': 'application/json'
        }
      });
       const result = await response.json();
      console.warn(result);
      
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

  return (
    <div className="Login">
      <h1>Login</h1>

      <input
        className="inputBox"
        type="text"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="email"
      />
      <input
        className="inputBox"
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Login
      </button>
    </div>
  );
};
export default Login;
