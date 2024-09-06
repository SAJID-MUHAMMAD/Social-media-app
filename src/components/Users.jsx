import Title from "./Title";
import Search from "./Search";
import UsersItems from "./UsersItems";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const db = getDatabase();
  const auth = getAuth();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState([]);

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
  }, [search]);

  useEffect(() => {
    if (search.length > 0) {
      onValue(ref(db, "users/"), (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (loggedUser.uid !== item.key) {
            if (
              item
                .val()
                .displayName.toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return arr.push({ ...item.val(), key: item.key });
            }
          }
        });
        setUserList(arr);
      });
    }
  }, [search]);

  return (
    <div className="w-1/3 h-[500px]  bg-white p-4 rounded-xl">
      <Title title="People" />
      <Search onSearch={setSearch} />

      <div className="mt-5 overflow-y-scroll h-4/6 pr-4 cardscrool">
        {userList.length > 0 ? (
          userList.map((item) => <UsersItems data={item} key={item.key} />)
        ) : (
          <p>No Users Found!</p>
        )}
      </div>
    </div>
  );
};

export default Users;
