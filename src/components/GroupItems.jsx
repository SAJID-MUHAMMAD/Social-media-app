import { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useSelector } from "react-redux";
import { GiCrossMark } from "react-icons/gi";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const GroupItems = ({ data }) => {
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const db = getDatabase();
  const [userList, setUserList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);

  useEffect(() => {
    onValue(ref(db, "users/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (loggedUser.uid !== item.key) {
          arr.push({ ...item.val(), key: item.key });
        }
      });

      setUserList(arr);
    });

    onValue(ref(db, "groupMembers/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().groupId + item.val().memberId);
      });

      setGroupMemberList(arr);
    });
  }, []);
  console.log(groupMemberList);

  const handelAddToGroup = (userdata) => {
    set(
      push(ref(db, "groupMembers/"), {
        groupId: data.key,
        groupName: data.groupName,
        memberName: userdata.displayName,
        memberId: userdata.key,
      })
    );
  };

  return (
    <div className="flex items-center gap-4 mb-4 ">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img className="w-full" src={data?.groupImg} alt="group_img" />
      </div>
      <div>
        <h3 className="name">{data?.groupName}</h3>
        <p>
          Admin :
          {loggedUser.uid === data.createBy ? "You" : `${data.creatorName}`}
        </p>
      </div>
      {loggedUser.uid === data.createBy ? (
        <IoMdMore
          className="ml-auto text-2xl cursor-pointer"
          onClick={() => setOpen(true)}
        />
      ) : groupMemberList.includes(data.key + loggedUser.uid) ? (
        <button className="ml-auto cursor-pointer">Leave</button>
      ) : (
        <button className="ml-auto cursor-pointer">Join</button>
      )}
      {open && (
        <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-slate-400 flex flex-col items-center justify-center gap-7 ">
          <h3 className="name">Group Name: {data.groupName}</h3>
          <div className="flex justify-center items-center gap-5">
            <GiCrossMark
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-xl text-white hover:text-red-600 duration-300 cursor-pointer"
            />
            <button className=" hover:text-white bg-white py-4 px-8 rounded-xl duration-300 hover:bg-red-500">
              Delete
            </button>
            <button
              onClick={() => {
                setOpenUser(true), setOpen(false);
              }}
              className=" hover:text-white bg-white py-4 px-8 rounded-xl duration-300 hover:bg-green-500"
            >
              Add Member
            </button>
          </div>
        </div>
      )}
      {openUser && (
        <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-slate-400 flex flex-col items-start gap-7 p-8 overflow-scroll ">
          <GiCrossMark
            onClick={() => setOpenUser(false)}
            className="absolute top-4 right-4 text-xl text-white hover:text-red-600 duration-300 cursor-pointer"
          />
          {userList.map((item) => (
            <div key={item.key} className="flex items-center gap-4 my-4 w-full">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={item?.photoURL} alt="users" className="w-full" />
              </div>
              <div>
                <h3 className="name">{item?.displayName}</h3>
              </div>
              {groupMemberList.includes(data.key + item.key) ? (
                <button className="ml-auto font-Inter text-lg font-normal text-brand">
                  Added
                </button>
              ) : (
                <button
                  onClick={() => handelAddToGroup(item)}
                  className="ml-auto font-Inter text-lg font-normal text-brand"
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupItems;
