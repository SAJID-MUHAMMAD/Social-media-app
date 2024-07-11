import AllGroup from "../components/AllGroup";
import BlockList from "../components/BlockList";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import MyGroup from "../components/MyGroup";
import Users from "../components/Users";

const Home = () => {
  return (
    <div className="">
      <div className="flex gap-5 py-10 ">
        <MyGroup />
        <AllGroup />
        <Friends />
      </div>
      <div className="flex gap-5 py-10">
        <Users />
        <FriendRequest />
        <BlockList />
      </div>
    </div>
  );
};

export default Home;
