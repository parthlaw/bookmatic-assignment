import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../api";
import { ContextProvider } from "../../context";
import Auth from "../../utils/Auth";
import "./Register.css";
const Register = () => {
  const {setUser,setAuth,auth,setLoading} = useContext(ContextProvider)
  interface IRegister {
    name: string;
    username: string;
    password: string;
  }
  const [formData, setFormData] = useState<IRegister>({} as IRegister);
  const navigate=useNavigate()
  useEffect(()=>{
    if(auth){
      navigate("/")
    }
  },[auth,navigate])
  const onClickRegister = async () => {
    console.log(formData);
    setLoading(true)
    const data = await register(formData);
    setLoading(false)
    if(data?.data.success){
      toast.success(data.data.message)
      localStorage.setItem("token", data.data.data.access.token);
      setUser(data.data.data.user)
      setAuth(true)
    }else{
      toast.error(data?.data.message)
    }
    console.log(data);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Auth>
        <div className="register-container">
          <div className="register-form">
            <h1>Register</h1>
            <div className="input">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={onInputChange} />
            </div>
            <div className="input">
              <label>Username</label>
              <input type="text" name="username" value={formData.username} onChange={onInputChange} />
            </div>
            <div className="input">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={onInputChange} />
            </div>
            <div className="input">
              <button className="btn submit" onClick={onClickRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
};

export default Register;
