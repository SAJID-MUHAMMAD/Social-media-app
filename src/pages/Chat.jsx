import Title from "../components/Title";
import Search from "../components/Search";
import ChatItems from "../components/ChatItems";
import ChatArea from "../components/ChatArea";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { GroupChatItems } from "../components/GroupChatItems";

const Chat = () => {
  let [friendList, setFriendList] = useState([]);
  const db = getDatabase();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [groupList, setGroupList] = useState([]);

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

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "groups/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), key: item.key });
      });
      setGroupList(arr);
    });
  }, []);
  return (
    <div className="py-10 h-screen flex justify-center">
      <div className="w-1/3 h-full bg-white p-4 rounded-l-xl">
        <Title title=" Chat" />
        <Search />
        <div className="overflow-y-scroll h-5/6 pr-4 cursor-pointer  cardscrool">
          <p>All Friends</p>
          {friendList.map((item) => (
            <ChatItems key={item.key} data={item} />
          ))}

          <p>All Groups</p>

          {groupList.map((item) => (
            <GroupChatItems key={item.key} data={item} />
          ))}
        </div>
      </div>
      <div className="w-1/2 ">
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;
