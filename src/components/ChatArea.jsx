import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import {
  getDownloadURL,
  getStorage,
  ref as imgRef,
  uploadBytes,
} from "firebase/storage";
import EmojiPicker from "emoji-picker-react";

const ChatArea = () => {
  const [message, setMessage] = useState("");
  const [chatImage, setChatImage] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const activeChat = useSelector((state) => state.activeChat.active);
  const activeType = useSelector((state) => state.activeChat.active?.type);
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const db = getDatabase();
  const storage = getStorage();

  const handelSendMsg = () => {
    if (activeType === "single") {
      const storageRef = imgRef(storage, `chatimg/${Date.now()}`);
      if (chatImage) {
        uploadBytes(storageRef, chatImage).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            set(
              push(ref(db, "allchat/"), {
                imageMsg: downloadURL,
                senderId: loggedUser.uid,
                senderName: loggedUser.displayName,
                reciverId: activeChat.friendId,
                reciverName: activeChat.friendName,
                type: "single",
              }).then(() => {
                setChatImage("");
              })
            );
          });
        });
      } else {
        set(
          push(ref(db, "allchat/"), {
            mail: message,
            imageMsg: chatImage,
            senderId: loggedUser.uid,
            senderName: loggedUser.displayName,
            reciverId: activeChat.friendId,
            reciverName: activeChat.friendName,
            type: "single",
          }).then(() => {
            setMessage("");
            setEmojiToggle(false);
          })
        );
      }
    } else if (activeType === "group") {
      set(
        push(ref(db, "allchat/"), {
          mail: message,
          senderId: loggedUser.uid,
          senderName: loggedUser.displayName,
          groupId: activeChat.groupId,
          type: "group",
        }).then(() => {
          setMessage("");
          setEmojiToggle(false);
        })
      );
    }
  };

  useEffect(() => {
    onValue(ref(db, "allchat/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (activeType === "single") {
          if (
            (item.val().reciverId === loggedUser.uid ||
              item.val().senderId === loggedUser.uid) &
            (item.val().reciverId === activeChat?.friendId ||
              item.val().senderId === activeChat?.friendId)
          ) {
            arr.push({ ...item.val(), key: item.key });
          }
        } else if (activeType === "group" && item.val().type === "group") {
          if (item.val().groupId === activeChat.groupId) {
            arr.push({ ...item.val(), key: item.key });
          }
        }
      });
      setMessageList(arr);
    });
  }, [activeChat?.key]);

  const handelEmoji = (e) => {
    setMessage((prevInput) => prevInput + e.emoji);
  };
  return (
    <div className="bg-white w-1/2 border-l rounded-r-xl flex flex-col pb-2">
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
            : activeType === "group" && activeChat?.groupName}
        </h3>
        <IoMdMore className="ml-auto" />
      </div>

      {/* chat area start */}
      <ScrollToBottom
        className={`${emojiToggle ? "h-[38px]" : "h-[74%]"} messageArea`}
      >
        {/* <div className="p-5 flex flex-col gap-3 overflow-y-scroll"> */}
        {messageList.map((item) =>
          item.type === "single" ? (
            item.senderId === loggedUser.uid ? (
              item.mail ? (
                <p
                  key={item.key}
                  className="bg-brand text-white p-2 rounded-lg w-fit text-base font-Inter ml-auto max-w-[60%] my-2"
                >
                  {item.mail}
                </p>
              ) : (
                item.imageMsg && (
                  <div key={item.key} className=" ml-auto w-24 my-2">
                    <img className="w-full" src={item.imageMsg}></img>
                  </div>
                )
              )
            ) : (
              item.reciverId === loggedUser.uid &&
              (item.mail ? (
                <p
                  key={item.key}
                  className="bg-[#E9E9E9] p-2 rounded-lg w-fit text-base font-Inter max-w-[60%] my-2"
                >
                  {item.mail}
                </p>
              ) : (
                item.imageMsg && (
                  <div key={item.key} className=" w-24 my-2">
                    <img className="w-full" src={item.imageMsg}></img>
                  </div>
                )
              ))
            )
          ) : (
            item.type === "group" &&
            (item.senderId === loggedUser.uid ? (
              <p
                key={item.key}
                className="bg-brand text-white p-2 rounded-lg w-fit text-base font-Inter ml-auto max-w-[60%]"
              >
                {item.mail}
              </p>
            ) : (
              <p
                key={item.key}
                className="bg-[#E9E9E9] p-2 rounded-lg w-fit text-base font-Inter max-w-[60%]"
              >
                {item.mail}
              </p>
            ))
          )
        )}
        {/* </div> */}
      </ScrollToBottom>
      {/* chat area end */}

      <div className=" mx-2 bg-[#F4F4F4] flex justify-between items-center rounded-md relative">
        <input
          onKeyDown={(e) => e.key == "Enter" && handelSendMsg()}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          placeholder="text here"
          className=" w-4/5 max-h-20 h-10 p-1 bg-transparent focus:outline-none"
        />
        <div className="flex gap-2 mr-2">
          <button>
            <GrEmoji
              onClick={() => setEmojiToggle(!emojiToggle)}
              className="text-lg text-brand"
            />
          </button>

          {/* ============ */}
          <label htmlFor="image" className=" cursor-pointer">
            <FaRegImage className="text-lg text-brand" />
          </label>
          <input
            onChange={(e) => setChatImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
          />
          {chatImage && (
            <div className="absolute left-0 bottom-full border-2 w-20">
              <button
                onClick={() => setChatImage("")}
                className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white ml-auto absolute right-0"
              >
                X
              </button>
              <img
                src={URL.createObjectURL(chatImage)}
                className=" w-full"
                alt=""
              />
            </div>
          )}
          {/* ============== */}

          <button>
            <IoMicOutline className="text-lg text-brand" />
          </button>
          {(message || chatImage) && (
            <button onClick={handelSendMsg}>
              <IoSend className="text-lg text-brand" />
            </button>
          )}
        </div>
      </div>
      <div>
        <EmojiPicker
          height={335}
          open={emojiToggle}
          style={{ width: "100%" }}
          onEmojiClick={handelEmoji}
        />
      </div>
    </div>
  );
};

export default ChatArea;
