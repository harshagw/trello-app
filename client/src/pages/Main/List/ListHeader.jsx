import React, { useState } from "react";
import { XIcon, PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { boardEmit } from "../../../app/features/boardSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// const schema = yup
//   .object({
//     name: yup.string().required("List Name is Required."),
//   })
//   .required();

const ListHeader = ({ data, dragProps }) => {
  const [disableNameInput, setDisableNameInput] = useState(true);
  const [newName, setNewName] = useState(data.name);

  // const { register, getValues, setValue, handleSubmit } = useForm({
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     name: data.name,
  //   },
  // });

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const cancelRename = () => {
    setDisableNameInput(true);
    setNewName(data.name);
    // setValue("name", data.name);
  };

  const deleteList = () => {
    console.log("delete a list");
    dispatch(boardEmit({ name: "list:delete", data: { _id: data._id } }));
  };

  const renameList = () => {
    console.log("rename a list");
    // const newName = getValues("name");

    console.log(newName);

    if (newName == "") return;

    dispatch(
      boardEmit({
        name: "list:rename",
        data: { _id: data._id, newName: newName },
      })
    );

    setDisableNameInput((state) => true);
  };

  return (
    <header {...dragProps}>
      <input
        type="type"
        value={disableNameInput ? data.name : newName}
        onChange={handleNameChange}
        onSubmit={renameList}
        disabled={disableNameInput ? "disabled" : false}
      />
      <div className="actions">
        {disableNameInput ? (
          <PencilIcon onClick={() => setDisableNameInput(false)} />
        ) : (
          <>
            <CheckIcon onClick={renameList} />
            <XIcon onClick={cancelRename} />
          </>
        )}

        <TrashIcon onClick={deleteList} />
      </div>
    </header>
  );
};

export default ListHeader;
