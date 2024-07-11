import React from "react";
import { IoMdMore } from "react-icons/io";

const Title = ({ title }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-Inter font-semibold text-11175D text-2xl">{title}</h2>
      <IoMdMore />
    </div>
  );
};

export default Title;
