import { ok } from "assert";
import { error } from "console";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpState {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [state, setState] = useState<SignUpState>({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/login');
    }
  }, [navigate]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const collectData = async () => {
    console.warn(state.name, state.email, state.password);
    try {
      let result = await fetch("http://localhost:5000/api/users", {
        method: "post",
        body: JSON.stringify(state),
        headers: {
          'content-type': 'application/json'
        },
      });
      if(!result.ok){
        const errorMessage=await result.json();
        throw new Error(errorMessage.error);
        
      }
      result = await result.json();
      console.warn(result);
      localStorage.setItem("user", JSON.stringify(result));
  
      navigate('/login');
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again later.");
    }
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="name"
      />
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
      <button onClick={collectData} className="appButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
