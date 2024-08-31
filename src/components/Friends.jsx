import Title from "./Title";
import Search from "./Search";
import FriendItem from "./FriendItem";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {
  let [friendList, setFriendList] = useState([]);
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "friendList/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().senderId === loggedUser.uid) {
          arr.push({
            friendName: item.val().recciverName,
            friendId: item.val().recciverId,
            friendImg: item.val().recciverImg,
            key: item.key,
          });
        } else if (item.val().recciverId === loggedUser.uid) {
          arr.push({
            friendName: item.val().senderName,
            friendId: item.val().senderId,
            friendImg: item.val().senderImg,
            key: item.key,
          });
        }
      });
      setFriendList(arr);
    });
  }, []);
  return (
    <div className="w-1/3 h-[500px] bg-white p-4  rounded-xl">
      <Title title=" Friends" />
      <Search />

      <div className="mt-5 overflow-y-scroll  pr-4 h-4/6 cardscrool">
        {friendList.length > 0 ? (
          friendList.map((item) => <FriendItem data={item} key={item.key} />)
        ) : (
          <div className="flex justify-center">
            <p>No Friends!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
