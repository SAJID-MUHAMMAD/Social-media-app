import Title from "./Title";
import FriendReqpestItems from "./FriendReqpestItems";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);

  let [friendReqList, setFriendReqList] = useState([]);
  useEffect(() => {
    onValue(ref(db, "friendReq/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().recciverId === loggedUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriendReqList(arr);
    });
  }, []);

  return (
    <div className="w-1/3 h-[500px] bg-white p-4  rounded-xl">
      <Title title=" Friend Requests" />
      <div className="mt-20 overflow-y-scroll  pr-4 h-4/6 cardscrool">
        {friendReqList.length > 0 ? (
          friendReqList.map((item) => (
            <FriendReqpestItems data={item} key={item.key} />
          ))
        ) : (
          <p>You have no Friend Request available!</p>
        )}
      </div>
    </div>
  );
};

export default FriendRequest;
