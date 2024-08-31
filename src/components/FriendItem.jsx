import { getDatabase, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const FriendItem = ({ data }) => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);

  const handelUnfriend = () => {
    remove(ref(db, "friendList/" + data.key));
  };
  const handelBlock = () => {
    set(push(ref(db, "blockList/")), {
      blockedId: data.friendId,
      blockedName: data.friendName,
      blockedImg: data.friendImg,
      blockedById: loggedUser.uid,
    }).then(() => {
      remove(ref(db, "friendList/" + data.key));
    });
  };
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img src={data?.friendImg} alt="friend" className="w-full" />
      </div>
      <div>
        <h3 className="name"> {data?.friendName}</h3>
      </div>
      <div className="flex flex-col ml-auto gap-3">
        <button
          onClick={handelUnfriend}
          className=" font-Inter text-sm font-normal  text-red-500"
        >
          Unfriend
        </button>
        <button
          onClick={handelBlock}
          className="font-Inter text-sm font-normal text-slate-700"
        >
          Block
        </button>
      </div>
    </div>
  );
};

export default FriendItem;
