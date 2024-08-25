import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";

const UsersItems = ({ data }) => {
  const db = getDatabase();
  let [friendReqList, setFriendReqList] = useState([]);
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
          Requested
        </button>
      ) : friendReqList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto font-Inter text-lg font-normal text-brand">
          Response
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
