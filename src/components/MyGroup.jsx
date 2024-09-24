import Title from "./Title";
import Search from "./Search";
import GroupItems from "./GroupItems";
import { useEffect, useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const MyGroup = () => {
  const [open, setOpen] = useState(false);
  const db = getDatabase();
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [groupNameErr, setGroupNameErr] = useState("");
  const loggedUser = useSelector((state) => state.loggedUser.user);

  const handelCreate = () => {
    if (!groupName) {
      return setGroupNameErr("Group Name is requird!");
    }
    set(
      push(ref(db, "groups/"), {
        groupName: groupName,
        groupImg: "/user.png",
        createdBy: loggedUser.uid,
        creatorName: loggedUser.displayName,
      }).then(() => {
        setOpen(false);
        setGroupName("");
        toast.success("Group is created");
      })
    );
  };
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "groups/"), (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().createdBy === loggedUser.uid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);

  return (
    <div className="w-1/3 h-[500px] bg-white p-4 rounded-xl relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
      ></ToastContainer>
      <Title title=" My Groups" click={setOpen} />
      <Search />
      <div className="mt-5 overflow-y-scroll h-4/6  pr-4 cardscrool">
        {groupList.map((item) => (
          <GroupItems data={item} key={item.key} />
        ))}
      </div>
      {open && (
        <div className="absolute left-0 top-0 w-full h-full rounded-xl bg-slate-300 p-8 flex flex-col items-center">
          <GiCrossMark
            onClick={() => {
              setOpen(false), setGroupName("");
            }}
            className="ml-auto text-xl text-red-600 cursor-pointer"
          />

          <h3 className="title">Create a New Group</h3>
          <input
            onChange={(e) => {
              setGroupName(e.target.value), setGroupNameErr("");
            }}
            type="text"
            name=""
            id=""
            placeholder="Group Name"
            className="w-full rounded-xl py-2 "
          />
          <p className="text-red-500">{groupNameErr}</p>
          <button
            onClick={handelCreate}
            className="py-2 px-4 bg-brand text-white rounded-xl mt-10"
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default MyGroup;
