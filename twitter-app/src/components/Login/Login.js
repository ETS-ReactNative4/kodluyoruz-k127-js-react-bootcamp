import React, { useState } from "react";
import "./Login.scss";

import { RiTwitterFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectLoading,
  selectLoginError,
  loginAsync,
} from "../../redux/reducers/user";
import Input from "../Input";

export default function Login() {
  const isMobile = useMediaQuery({ minWidth: 600 });

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectLoginError);
  const history = useHistory();
  const [showError, setShowError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    setShowError(true);
    await dispatch(loginAsync(data));
    if (error === null) history.push("/");
  }

  return (
    <>
      
      <div className="login">
        {isMobile && (
          <div className="photo">
            <img
              src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
              alt="twitter"
            />
            <RiTwitterFill />
          </div>
        )}
        <div className="formCont">
          <div className="formHade">
            <RiTwitterFill />
            <h1>Happening now</h1>
            <h2>Join Twitter today.</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && showError ? <span className="errorbar">{error}</span> : null}
            <Input
              type="email"
              placeholder="example@example.com"
              error={errors.email}
              {...register("email", { required: true })}
            />
            <Input
              type="password"
              placeholder="Password"
              error={errors.password}
              {...register("password", { required: true })}
            />
            
            <Input
              type="submit"
              value={!loading ? "Login" : "Loading ..."}
              disabled={loading ? true : false}
            />
            <span>
              Don’t have an account?<Link to="/SignUp"> Sign Up</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
