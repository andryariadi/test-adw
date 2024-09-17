"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import UserList from "./UserList";

const MenuAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="py-3 px-8 rounded-md flex items-center justify-between dark:hover:bg-n-8 hover:bg-neutral-100 transition-all duration-300 dark:text-neutral-200 text-n-5">
        <div className="flex items-center gap-3">
          <FaUser size={13} />
          <h3 className="text-base">User</h3>
        </div>
        <IoIosArrowUp size={16} className={`cursor-pointer ${isOpen ? "rotate-180" : ""} transition-transform ease-in-out duration-500`} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* User Lists */}
      {isOpen && <UserList />}
    </>
  );
};

export default MenuAdmin;
