const UsersItems = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div>
        <img src="/friend.png" alt="friend" />
      </div>
      <div>
        <h3 className="name">Savannah Nguyen</h3>
      </div>
      <button className="ml-auto font-Inter text-lg font-normal text-brand">
        Add
      </button>
    </div>
  );
};

export default UsersItems;
