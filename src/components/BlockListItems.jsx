import { getDatabase, ref, remove } from "firebase/database";
import React from "react";

const BlockListItems = ({ data }) => {
  const db = getDatabase();

  const handelUnblock = () => {
    remove(ref(db, "blockList/" + data.key));
  };

  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img src={data?.blockedImg} alt="friend" className="w-full" />
      </div>
      <div>
        <h3 className="name"> {data?.blockedName}</h3>
      </div>
      <button
        onClick={handelUnblock}
        className="ml-auto font-Inter text-sm font-normal text-brand"
      >
        Unblock
      </button>
    </div>
  );
};

export default BlockListItems;
