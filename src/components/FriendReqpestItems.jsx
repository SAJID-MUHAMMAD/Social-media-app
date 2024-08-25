import { getDatabase, ref, remove } from "firebase/database";

const FriendReqpestItems = ({ data }) => {
  const db = getDatabase();

  const handelCancel = () => {
    remove(ref(db, "friendReq/" + data.key));
  };
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img src={data?.senderImg} alt="friend" />
      </div>
      <div>
        <h3 className="name"> {data?.senderName}</h3>
      </div>
      <div className="flex flex-col ml-auto">
        <button className=" font-Inter text-sm font-normal  text-slate-700">
          Confirm
        </button>
        <button
          onClick={handelCancel}
          className="font-Inter text-sm font-normal text-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FriendReqpestItems;
