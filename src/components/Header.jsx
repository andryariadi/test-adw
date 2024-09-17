"use client";

import Search from "./Search";
import { MdOutlineChat, MdNotifications, MdPublic } from "react-icons/md";
import ThemeSwitch from "./ThemeSwitch";
import { IoMdLogOut } from "react-icons/io";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import useUsersStore from "src/libs/storeUser";

const Header = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { resetUsers } = useUsersStore();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("currentUser");
    Cookie.remove("user");
    resetUsers();
    router.push("/login");
  };

  return (
    <header className="dark:bg-n-7 bg-neutral-100 border border-n-1/10 dark:border-n-1/20 py-3 rounded-md px-5 flex items-center justify-between dark:text-neutral-100 text-n-5">
      <h1 className="text-lg font-semibold">Admin</h1>

      <div className="flex items-center gap-5">
        <Search />
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <MdOutlineChat size={20} className="hidden md:block cursor-pointer hover:text-logo transition-all duration-300" aria-label="Chat" role="button" />
          <MdNotifications size={20} className="hidden md:block cursor-pointer hover:text-logo transition-all duration-300" aria-label="Notifications" role="button" />
          <MdPublic size={20} className="hidden md:block cursor-pointer hover:text-logo transition-all duration-300" aria-label="Public" role="button" />
          {currentUser && (
            <button type="button" onClick={handleLogout}>
              <IoMdLogOut size={20} className="cursor-pointer hover:text-logo transition-all duration-300" aria-label="Logout" role="button" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
