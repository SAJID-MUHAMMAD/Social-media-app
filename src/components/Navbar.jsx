import {
  SideNavbar,
  NavbarBrand,
  MenuBar,
  DropDown,
  NavItem,
  Contact,
} from "responsive-navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

import { loggedUserData } from "../reducer/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.loggedUser.user);
  const path = location.pathname;

  const handelLogout = () => {
    dispatch(loggedUserData(null));
    navigate("/login");
  };
  return (
    <SideNavbar style={{ width: "200px", background: "white" }}>
      <NavbarBrand>
        <Link to="/" className=" text-3xl font-Inter font-bold ">
          ChatNest
        </Link>
      </NavbarBrand>
      <MenuBar>
        <NavItem>
          <Link
            to="/"
            className={`${
              path === "/" ? "bg-brand text-white" : "bg-white text-brand"
            }  py-3 px-10 w-fit items-center rounded-xl`}
          >
            <IoMdHome />

            <p className="pl-2">Home</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/chat"
            className={`${
              path === "/chat" ? "bg-brand text-white" : "bg-white text-brand"
            }  py-3 px-10 w-fit items-center rounded-xl`}
          >
            <IoChatbubbleEllipses />

            <p className="pl-2">Chat</p>
          </Link>
        </NavItem>
      </MenuBar>
      <Contact>
        <div>
          <Link
            to="/profile"
            className={` w-full flex justify-center py-2 rounded-lg items-center gap-2 ${
              path === "/profile" && "bg-brand text-white"
            }`}
          >
            <div className="w-12 rounded-full overflow-hidden">
              <img
                src={loggedUser?.photoURL}
                alt="profile"
                className="w-full"
              />
            </div>

            <p className="flex flex-col text-xl">
              <span> {loggedUser?.displayName} </span>
              <span>Edit Profile</span>
            </p>
          </Link>
          <button
            onClick={handelLogout}
            className="bg-brand py-2 px-4 text-white rounded-lg w-full mt-8"
          >
            Logout
          </button>
        </div>
      </Contact>
    </SideNavbar>
  );
};

export default Navbar;
