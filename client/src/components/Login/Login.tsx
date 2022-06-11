import Cookies from "js-cookie";
import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../api";
import { ContextProvider } from "../../context";
import Auth from "../../utils/Auth";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  interface ILogin {
    username: string;
    password: string;
  }
  const [formData, setFormData] = useState<ILogin>({} as ILogin);
  const { auth, setAuth, setUser, setLoading } = useContext(ContextProvider);
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);
  const onClickLogin = async () => {
    console.log(formData);
    setLoading(true);
    const data = await login(formData);
    setLoading(false);
    if (data?.data.success) {
      toast.success(data.data.message);
      console.log(typeof data.data.data.access.token, "TOKEN");
      localStorage.setItem("token", data.data.data.access.token);
      setUser(data.data.data.user);
      setAuth(true);
    } else {
      toast.error(data?.data.message);
    }
    console.log(data?.data.success, "success");
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Auth>
        <div className="login-container">
          <div className="login-form">
            <h1>Login</h1>
            <div className="input">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={onInputChange}
              />
            </div>
            <div className="input">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onInputChange}
              />
            </div>
            <div className="input">
              <button className="btn submit" onClick={onClickLogin}>
                Login
              </button>
              <Link to="/register">
                <button className="btn submit">Register Instead</button>
              </Link>
            </div>
          </div>
        </div>
      </Auth>
    </>
  );
};

export default Login;
