import { IoMdMore } from "react-icons/io";

const GroupItems = ({ data }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img className="w-full" src={data?.groupImg} alt="group_img" />
      </div>
      <div>
        <h3 className="name">{data?.groupName}</h3>
        <p>love you...</p>
      </div>
      <IoMdMore className="ml-auto cursor-pointer" />
    </div>
  );
};

export default GroupItems;
