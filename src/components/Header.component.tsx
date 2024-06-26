import { useState } from "react";
import {
  // FaAngleDown,
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  // FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}
const userImg = "https://avatar.iran.liara.run/username?username=username";
const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //Logout Handler
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("User Logged Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("User SignOut failed");
    }
  };
  return (
    <div className="container">
      <nav className="header">
        <Link to="/">ShopCart</Link>
        <div className="header-menu">
          <Link onClick={() => setIsOpen(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setIsOpen(false)} to="/search">
            <FaSearch /> Search
          </Link>
        </div>

        <div className="header-menu">
          <Link onClick={() => setIsOpen(false)} to="/cart">
            <FaShoppingCart /> Cart
          </Link>

          {user?._id ? (
            <>
              <button onClick={() => setIsOpen(!isOpen)}>
                <img src={user?.photo || userImg} alt="User" />
              </button>
              <dialog open={isOpen}>
                <div>
                  {user.role === "admin" && (
                    <Link
                      to={"/admin/dashboard"}
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link to={"/orders"} onClick={() => setIsOpen(false)}>
                    Orders
                  </Link>
                  <button onClick={logoutHandler}>
                    <FaSignOutAlt />
                  </button>
                </div>
              </dialog>
            </>
          ) : (
            <button className="">
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
