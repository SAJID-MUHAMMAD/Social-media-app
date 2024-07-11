import React from "react";

const ChatItems = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Savannah Nguyen</h3>
      </div>
      <button className="ml-auto font-Inter text-sm font-normal text-brand">
        10:30 PM
      </button>
    </div>
  );
};

export default ChatItems;
