import React, { useState } from "react";
import { XIcon, PencilIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("List Name is Required."),
  })
  .required();

const ListHeader = ({ data, dragProps }) => {
  const { register, getValues, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: data.name,
    },
  });

  const dispatch = useDispatch();

  const deleteList = () => {
    console.log("delete a list");
    dispatch(boardEmit({ name: "list:delete", data: { _id: data._id } }));
  };

  const renameList = () => {
    console.log("rename a list");
    const newName = getValues("name");

    console.log(newName);

    if (newName == "") return;
    dispatch(
      boardEmit({
        name: "list:rename",
        data: { _id: data._id, newName: newName },
      })
    );
  };

  return (
    <header {...dragProps}>
      <input type="type" {...register("name")} onSubmit={renameList} />
      <div className="actions">
        <PencilIcon onClick={handleSubmit(renameList)} />
        <XIcon onClick={deleteList} />
      </div>
    </header>
  );
};

export default ListHeader;
