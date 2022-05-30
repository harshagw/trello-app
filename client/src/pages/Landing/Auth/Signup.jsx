import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  register as registerAuth,
  reset,
} from "../../../app/features/authSlice";

const schema = yup
  .object({
    name: yup
      .string()
      .required("First Name is Required.")
      .min(1, " Name is Too Short."),
    email: yup
      .string()
      .email("This should be valid email address.")
      .required("Email is Required."),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log("error");
      console.log(message);

      resetField("email");
      resetField("password");
      setError("email", { type: "custom", message: "email already exists" });
    }

    if (isSuccess) {
      navigate("/signin");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(registerAuth(userData));
  };

  console.log("rendred");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="section form">
        <div className="headings">
          <h1>Create your account</h1>
        </div>
        <div className="input_block">
          <input {...register("name")} type="text" placeholder="Your name" />
          <p>{errors.name?.message}</p>
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
          <button className="button button_larger">create</button>
        )}
      </div>
    </form>
  );
};

export default Signup;
