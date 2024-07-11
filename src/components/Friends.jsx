import Title from "./Title";
import Search from "./Search";
import FriendItem from "./FriendItem";

const Friends = () => {
  return (
    <div className="w-1/3 h-[500px] bg-white p-4  rounded-xl">
      <Title title=" Friends" />
      <Search />

      <div className="mt-5 overflow-y-scroll  pr-4 h-4/6 cardscrool">
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
      </div>
    </div>
  );
};

export default Friends;
