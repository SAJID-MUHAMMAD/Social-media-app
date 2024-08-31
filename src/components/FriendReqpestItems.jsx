import { getDatabase, push, ref, remove, set } from "firebase/database";

const FriendReqpestItems = ({ data }) => {
  const db = getDatabase();

  const handelCancel = () => {
    remove(ref(db, "friendReq/" + data.key));
  };

  const handelConfirm = () => {
    set(push(ref(db, "friendList/")), {
      senderId: data.senderId,
      senderName: data.senderName,
      senderImg: data.senderImg,

      recciverId: data.recciverId,
      recciverName: data.recciverName,
      recciverImg: data.recciverImg,
    }).then(() => {
      remove(ref(db, "friendReq/" + data.key));
    });
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
        <button
          onClick={handelConfirm}
          className=" font-Inter text-sm font-normal  text-slate-700"
        >
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
