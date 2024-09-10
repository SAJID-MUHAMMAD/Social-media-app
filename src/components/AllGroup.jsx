import Title from "./Title";
import Search from "./Search";
import GroupItems from "./GroupItems";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const AllGroup = () => {
  const db = getDatabase();
  const [groupList, setGroupList] = useState([]);
  const loggedUser = useSelector((state) => state.loggedUser.user);

  useEffect(() => {
    let arr = [];
    onValue(ref(db, "groups/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), key: item.key });
      });
      setGroupList(arr);
    });
  }, []);
  return (
    <div className="w-1/3 h-[500px] bg-white p-4 rounded-xl relative">
      <Title title=" Group" />
      <Search />

      <div className="mt-5 overflow-y-scroll h-4/6  pr-4 cardscrool">
        {groupList.map((item) => (
          <GroupItems data={item} key={item.key} />
        ))}
      </div>
    </div>
  );
};

export default AllGroup;
