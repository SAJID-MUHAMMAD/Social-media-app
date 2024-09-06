import React from "react";
import { IoMdMore } from "react-icons/io";

const Title = ({ title, click }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-Inter font-semibold text-11175D text-2xl">{title}</h2>
      <IoMdMore
        onClick={() => click(true)}
        className="cursor-pointer text-xl"
      />
    </div>
  );
};

export default Title;
