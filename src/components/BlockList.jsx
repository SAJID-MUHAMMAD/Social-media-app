import Title from "./Title";
import BlockListItems from "./BlockListItems";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BlockList = () => {
  const db = getDatabase();
  const [blockList, setBlockList] = useState([]);
  const loggedUser = useSelector((state) => state.loggedUser.user);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "blockList/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().blockedById === loggedUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setBlockList(arr);
    });
  }, []);

  return (
    <div className="w-1/3 h-[500px] bg-white p-4  rounded-xl">
      <Title title="Block List" />

      <div className="mt-20 overflow-y-scroll  pr-4 h-4/6 cardscrool">
        {blockList.length > 0 ? (
          blockList.map((item) => <BlockListItems data={item} key={item.key} />)
        ) : (
          <p className="text-center">Unavailable!</p>
        )}
      </div>
    </div>
  );
};

export default BlockList;
