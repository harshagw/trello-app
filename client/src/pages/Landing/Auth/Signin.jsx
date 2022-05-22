import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  login as authLogin,
  reset as authReset,
} from "../../../features/auth/authSlice";

const schema = yup
  .object({
    email: yup
      .string()
      .email("This should be valid email address.")
      .required("Email is Required."),
    password: yup.string().required("Password is Required."),
  })
  .required();

const Signin = () => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log("error");
      console.log(message);

      resetField("password");
      setError("password", {
        type: "custom",
        message: "incorrect password",
      });
    }

    dispatch(authReset());
  }, [isError, message, navigate, dispatch]);

  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    dispatch(authLogin(userData));
  };

  console.log("rendred");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="section form">
        <div className="headings">
          <h1>Welcome back,</h1>
        </div>
        <div className="input_block">
          <input
            {...register("email")}
            type="email"
            placeholder="Your email address"
          />
          <p>{errors.email?.message}</p>
        </div>
        <div className="input_block">
          <input
            {...register("password")}
            type="password"
            placeholder="Your password"
          />
          <p>{errors.password?.message}</p>
        </div>
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <button className="button button_larger">submit</button>
        )}
      </div>
    </form>
  );
};

export default Signin;
