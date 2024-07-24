import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";

const ChatArea = () => {
  return (
    <div className="bg-white h-full rounded-r-xl overflow-hidden border-l flex flex-col pb-2">
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

      <div className=" mt-auto mx-2 bg-[#F4F4F4] border flex justify-between items-center rounded-md">
        <textarea
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
          <button>
            <IoSend className="text-lg text-brand" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
