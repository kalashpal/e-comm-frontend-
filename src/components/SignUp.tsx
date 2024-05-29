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
 const navigate=useNavigate();
 useEffect(()=>{
  const auth=localStorage.getItem('user');
  if(auth){
    navigate('/')
  }
 })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const CollectData = async () => {
    console.warn(state.name, state.email, state.password);
    let result= await fetch("http://localhost:5000/register",{
      method:"post",
      body:JSON.stringify(state),
      headers:{
        'content-type':'application/json'
      },
    })
    result= await result.json();
    console.warn (result);
    localStorage.setItem("user",JSON.stringify(result));

    navigate('/');
    
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
      <button onClick={CollectData} className="appButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
