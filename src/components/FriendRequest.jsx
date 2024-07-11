import Title from "./Title";
import FriendReqpestItems from "./FriendReqpestItems";

const FriendRequest = () => {
  return (
    <div className="w-1/3 h-[500px] bg-white p-4  rounded-xl">
      <Title title=" Friend Requests" />

      <div className="mt-20 overflow-y-scroll  pr-4 h-4/6 cardscrool">
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
        <FriendReqpestItems />
      </div>
    </div>
  );
};

export default FriendRequest;
