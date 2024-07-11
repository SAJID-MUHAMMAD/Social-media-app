import Title from "./Title";
import Search from "./Search";
import GroupItems from "./GroupItems";

const MyGroup = () => {
  return (
    <div className="w-1/3 h-[500px] bg-white p-4 rounded-xl">
      <Title title=" My Groups" />
      <Search />
      <div className="mt-5 overflow-y-scroll h-4/6  pr-4 cardscrool">
        <GroupItems />
        <GroupItems />
        <GroupItems />
        <GroupItems />
        <GroupItems />
      </div>
    </div>
  );
};

export default MyGroup;
