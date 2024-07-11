import Title from "./Title";
import BlockListItems from "./BlockListItems";

const BlockList = () => {
  return (
    <div className="w-1/3 h-[500px] bg-white p-4  rounded-xl">
      <Title title="Block List" />

      <div className="mt-20 overflow-y-scroll  pr-4 h-4/6 cardscrool">
        <BlockListItems />
        <BlockListItems />
        <BlockListItems />
        <BlockListItems />
        <BlockListItems />
      </div>
    </div>
  );
};

export default BlockList;
