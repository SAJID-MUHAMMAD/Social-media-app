import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const activeChat = useSelector((state) => state.activeChat.active);
  const activeType = useSelector((state) => state.activeChat.active?.type);
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();

  const handelSendMsg = () => {
    if (activeType === "single") {
      set(
        push(ref(db, "allchat/"), {
          mail: message,
          senderId: loggedUser.uid,
          senderName: loggedUser.displayName,
          reciverId: activeChat.friendId,
          reciverName: activeChat.friendName,
          type: "single",
        }).then(() => {
          setMessage("");
        })
      );
    } else if (activeType === "group") {
      set(
        push(ref(db, "allchat/"), {
          mail: message,
          senderId: loggedUser.uid,
          senderName: loggedUser.displayName,
          reciverId: activeChat.key,
          type: "group",
        }).then(() => {
          setMessage("");
        })
      );
    }
  };

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "allchat/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().type === "single") {
          if (
            (item.val().reciverId === loggedUser.uid ||
              item.val().senderId === loggedUser.uid) &
              (item.val().reciverId === activeChat.friendId) ||
            item.val().senderId === activeChat.friendId
          ) {
            arr.push({ ...item.val(), key: item.key });
          }
        } else if (item.val().type === "group") {
          if (
            item.val().reciverId === activeChat.key ||
            item.val().senderId === loggedUser.uid
          ) {
            arr.push({ ...item.val(), key: item.key });
          }
        }
      });
      setMessageList(arr);
    });
  }, [activeChat.friendId || activeChat.key]);

  return (
    <div className="bg-white h-full rounded-r-xl overflow-hidden border-l flex flex-col pb-2">
      <div className="pt-12 pb-3 px-3 flex items-center gap-4 shadow-md">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={
              activeType === "single"
                ? activeChat?.friendImg
                : activeType === "group"
                ? activeChat?.groupImg
                : "/user.png"
            }
            alt="friend"
            className="w-full"
          />
        </div>
        <h3 className="name">
          {activeType === "single"
            ? activeChat?.friendName
            : activeType === "group"
            ? activeChat?.groupName
            : "No User"}
        </h3>
        <IoMdMore className="ml-auto" />
      </div>

      {/* chat area start */}
      <div className="p-5 flex flex-col gap-3">
        {messageList.map((item) =>
          item.senderId === loggedUser.uid ? (
            <p className="bg-brand text-white p-2 rounded-lg w-fit text-base font-Inter ml-auto max-w-[60%]">
              {item.mail}
            </p>
          ) : (
            item.reciverId === loggedUser.uid && (
              <p className="bg-[#E9E9E9] p-2 rounded-lg w-fit text-base font-Inter max-w-[60%]">
                {item.mail}
              </p>
            )
          )
        )}
      </div>
      {/* chat area end */}

      <div className=" mt-auto mx-2 bg-[#F4F4F4] border flex justify-between items-center rounded-md">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="text here"
          className=" w-4/5 max-h-20 h-10 p-1 bg-transparent focus:outline-none"
        />
        <div className="flex gap-2 mr-2">
          <button>
            <GrEmoji className="text-lg text-brand" />
          </button>
          <button>
            <FaRegImage className="text-lg text-brand" />
          </button>
          <button>
            <IoMicOutline className="text-lg text-brand" />
          </button>
          {message && (
            <button onClick={handelSendMsg}>
              <IoSend className="text-lg text-brand" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
