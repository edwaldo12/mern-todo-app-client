import React from "react";

type Props = {
  onClickHandler: () => void;
};

const EditButton: React.FC<Props> = ({ onClickHandler }) => {
  return (
    <button onClick={onClickHandler}>Edit</button>
  )
};

export default EditButton;