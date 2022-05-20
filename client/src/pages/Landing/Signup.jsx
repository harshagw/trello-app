import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
        <button className="button button_larger">create</button>
      </div>
    </form>
  );
};

export default Signup;
