import React from "react";

const BlockListItems = () => {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Savannah Nguyen</h3>
      </div>
      <button className="ml-auto font-Inter text-sm font-normal text-brand">
        Unblock
      </button>
    </div>
  );
};

export default BlockListItems;
