import {
  SideNavbar,
  NavbarBrand,
  MenuBar,
  DropDown,
  NavItem,
  Contact,
} from "responsive-navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <SideNavbar style={{ width: "200px", background: "white" }}>
      <NavbarBrand>
        <Link to="/" className=" text-3xl font-Inter font-bold">
          ChatApp
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
        <Link
          to="/profile"
          className={` w-full flex justify-center py-2 rounded-lg items-center gap-2 ${
            path === "/profile" && "bg-brand text-white"
          }`}
        >
          <FaRegUserCircle className="text-2xl" />

          <p className="flex flex-col text-xl">
            <span> Paula Mora</span>
            <span>Edit Profile</span>
          </p>
        </Link>
      </Contact>
    </SideNavbar>
  );
};

export default Navbar;
