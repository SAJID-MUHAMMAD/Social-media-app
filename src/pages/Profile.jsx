import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

const Profile = () => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  return (
    <div className="p-10 bg-[#f4f4f4] w-fit flex flex-col items-center m-auto mt-24 shadow">
      <div className="w-24 h-24 relative rounded-full overflow-hidden group">
        <img src={loggedUser?.photoURL} className="w-full" alt="friend" />
        <div className="w-full h-full scale-0 group-hover:scale-100 transition-all absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] cursor-pointer flex items-center justify-center">
          <CiCirclePlus className="text-3xl text-white" />
        </div>
      </div>
      <h2 className="title capitalize">{loggedUser.displayName}</h2>
    </div>
  );
};

export default Profile;
