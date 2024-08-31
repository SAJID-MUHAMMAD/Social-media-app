import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";

const UsersItems = ({ data }) => {
  const db = getDatabase();
  let [friendReqList, setFriendReqList] = useState([]);
  let [friendList, setFriendList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  const loggedUser = useSelector((state) => state.loggedUser.user);

  const handelReq = () => {
    set(
      push(ref(db, "friendReq/"), {
        senderId: loggedUser.uid,
        senderName: loggedUser.displayName,
        senderImg: loggedUser.photoURL,

        recciverId: data.key,
        recciverName: data.displayName,
        recciverImg: data.photoURL,
      })
    );
  };
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "friendReq/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (
          item.val().senderId === loggedUser.uid ||
          item.val().recciverId === loggedUser.uid
        ) {
          arr.push(item.val().senderId + item.val().recciverId);
        }
      });
      setFriendReqList(arr);
    });
  }, []);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "friendList/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (
          item.val().senderId === loggedUser.uid ||
          item.val().recciverId === loggedUser.uid
        ) {
          arr.push(item.val().senderId + item.val().recciverId);
        }
      });
      setFriendList(arr);
    });
  }, []);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "blockList/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (
          item.val().blockedById === loggedUser.uid ||
          item.val().blockedId === loggedUser.uid
        ) {
          arr.push(item.val().blockedById + item.val().blockedId);
        }
      });
      setBlockList(arr);
    });
  }, []);
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img src={data?.photoURL} alt="users" className="w-full" />
      </div>
      <div>
        <h3 className="name">{data?.displayName}</h3>
      </div>
      {friendReqList.includes(loggedUser.uid + data.key) ? (
        <button className="ml-auto font-Inter text-lg font-normal text-brand">
          Cancel
        </button>
      ) : friendReqList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto font-Inter text-lg font-normal text-brand">
          Response
        </button>
      ) : friendList.includes(loggedUser.uid + data.key) ||
        friendList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto font-Inter text-lg font-normal text-brand">
          Friends
        </button>
      ) : blockList.includes(loggedUser.uid + data.key) ||
        blockList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto font-Inter text-lg font-normal text-brand">
          Blocked
        </button>
      ) : (
        <button
          onClick={handelReq}
          className="ml-auto font-Inter text-lg font-normal text-brand"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default UsersItems;
