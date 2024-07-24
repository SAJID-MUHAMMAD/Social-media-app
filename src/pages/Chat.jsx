import Title from "../components/Title";
import Search from "../components/Search";
import ChatItems from "../components/ChatItems";
import ChatArea from "../components/ChatArea";

const Chat = () => {
  return (
    <div className="py-10 h-screen flex justify-center">
      <div className="w-1/3 h-full bg-white p-4 rounded-l-xl">
        <Title title=" Chat" />
        <Search />
        <div className="overflow-y-scroll h-5/6 pr-4 cursor-pointer  cardscrool">
          <ChatItems />
          <ChatItems />
        </div>
      </div>
      <div className="w-1/2 ">
        <ChatArea />
      </div>
    </div>
  );
};

export default Chat;
