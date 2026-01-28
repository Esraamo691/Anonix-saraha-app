import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link as NavbarLink,
  Button,
} from "@heroui/react";
import { FaUser } from "react-icons/fa";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import LogoImg from "./LogoImg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function App() {
  const menuItems = ["Dashboard", "Profile", "Log Out"];
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <Navbar
      disableAnimation
      isBordered
      className="bg-transparent backdrop-blur-sm"
    >
      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link to={"/"} className="flex items-center">
            <LogoImg />
            <h1 className="font-bold text-inherit">Anonix</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="end">
        <NavbarBrand>
          <Link to={"/"} className="flex items-center">
            <LogoImg />
            <h1 className="font-bold text-inherit ms-1">Anonix</h1>
          </Link>
        </NavbarBrand>
        {token ? (
          <>
            <NavbarItem>
              <NavLink
                color="foreground"
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-3 py-2 rounded-2xl flex items-center gap-2`
                    : `text-gray-400 flex items-center gap-2`
                }
                to={"/dashboard"}
              >
                <FaUser /> Dashboard
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                aria-current="page"
                color="warning"
                to={"/profile"}
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-3 py-2 rounded-2xl flex items-center gap-2`
                    : `text-gray-400 flex items-center gap-2`
                }
              >
                <FaUser /> Profile
              </NavLink>
            </NavbarItem>

            <NavbarItem>
              <Button
                color="primary"
                className="text-medium text-white  "
                startContent={<LuLogOut />}
                variant="ghost"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink
                aria-current="page"
                color="warning"
                to={"/login"}
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-4 py-2 rounded-2xl flex items-center gap-2`
                    : `text-gray-400 flex items-center gap-2`
                }
              >
                <LuLogIn /> Login
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                aria-current="page"
                color="warning"
                to={"/register"}
                className={({ isActive }) =>
                  isActive
                    ? `text-white btn px-4 py-2 rounded-2xl flex items-center gap-2`
                    : `text-gray-400 flex items-center gap-2`
                }
              >
                Sign Up
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        {token && <NavbarMenuToggle />}
      </NavbarContent>
      {token && (
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavbarLink
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                to={"/"}
                size="lg"
              >
                {item}
              </NavbarLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      )}
    </Navbar>
  );
}
