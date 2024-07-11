const FriendReqpestItems = () => {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Savannah Nguyen</h3>
      </div>
      <div className="flex flex-col ml-auto">
        <button className=" font-Inter text-sm font-normal  text-slate-700">
          Confirm
        </button>
        <button className="font-Inter text-sm font-normal text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FriendReqpestItems;
