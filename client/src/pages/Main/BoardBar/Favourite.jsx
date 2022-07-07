import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../../../app/features/userSlice";

const Favourite = ({ boardId }) => {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.user);

  const isFavourite = favourites.includes(boardId);

  const handleRemoveFavourite = () => {
    dispatch(removeFavourite(boardId));
  };

  const handleAddFavourite = () => {
    dispatch(addFavourite(boardId));
  };

  if (isFavourite) return <AiFillStar onClick={handleRemoveFavourite} />;

  return <AiOutlineStar onClick={handleAddFavourite} />;
};

export default Favourite;
