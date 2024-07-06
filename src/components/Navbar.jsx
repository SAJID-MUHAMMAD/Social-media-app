import {
  SideNavbar,
  NavbarBrand,
  MenuBar,
  DropDown,
  NavItem,
  Contact,
} from "responsive-navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";

const Navbar = () => {
  return (
    <SideNavbar style={{ width: "250px", background: "white" }}>
      <NavbarBrand>
        <a href="/" style={{ fontSize: "30px", fontWeight: "700" }}>
          Community
        </a>
      </NavbarBrand>
      <MenuBar>
        <NavItem>
          <Link
            to="/home"
            className="bg-[#32375C] text-white py-3 px-10 w-fit items-center rounded-xl"
          >
            <IoMdHome />

            <p className="pl-2">Home</p>
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/home"
            className=" py-3 px-10 w-fit items-center rounded-xl"
          >
            <IoChatbubbleEllipses />

            <p className="pl-2">Chat</p>
          </Link>
        </NavItem>
      </MenuBar>
      <Contact>
        <div className="flex items-center gap-2">
          <FaRegUserCircle className="text-2xl" />

          <p className="flex flex-col text-xl">
            <span> Paula Mora</span>
            <span>Edit Profile</span>
          </p>
        </div>
      </Contact>
    </SideNavbar>
  );
};

export default Navbar;
