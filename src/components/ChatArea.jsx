import { IoMdMore } from "react-icons/io";

const ChatArea = () => {
  return (
    <div className="bg-white rounded-r-xl overflow-hidden border-l">
      <div className="pt-12 pb-3 px-3 flex items-center gap-4 shadow-md">
        <div>
          <img src="/friend.png" alt="friend" />
        </div>
        <h3 className="name">Jenny Wilson</h3>
        <IoMdMore className="ml-auto" />
      </div>

      {/* chat area start */}
      <div className="p-5 flex flex-col gap-3">
        {/* received message */}
        <p className="bg-[#E9E9E9] p-2 rounded-lg w-fit text-base font-Inter max-w-[60%]">
          received message
        </p>
        {/* send message */}
        <p className="bg-brand text-white p-2 rounded-lg w-fit text-base font-Inter ml-auto max-w-[60%]">
          send message
        </p>
      </div>
      {/* chat area end */}
    </div>
  );
};

export default ChatArea;
