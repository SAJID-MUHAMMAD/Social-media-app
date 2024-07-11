import Title from "./Title";
import Search from "./Search";
import UsersItems from "./UsersItems";

const Users = () => {
  return (
    <div className="w-1/3 h-[500px]  bg-white p-4 rounded-xl">
      <Title title="People" />
      <Search />

      <div className="mt-5 overflow-y-scroll h-4/6 pr-4 cardscrool">
        <UsersItems />
        <UsersItems />
        <UsersItems />
        <UsersItems />
        <UsersItems />
        <UsersItems />
      </div>
    </div>
  );
};

export default Users;
