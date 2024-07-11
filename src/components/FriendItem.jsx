const FriendItem = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Savannah Nguyen</h3>
      </div>
      <div className="flex flex-col ml-auto">
        <button className=" font-Inter text-sm font-normal  text-red-500">
          Unfriend
        </button>
        <button className="font-Inter text-sm font-normal text-slate-700">
          Block
        </button>
      </div>
    </div>
  );
};

export default FriendItem;
