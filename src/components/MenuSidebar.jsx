"use client";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { HiMiniUserGroup } from "react-icons/hi2";
import { HiShoppingBag } from "react-icons/hi2";
import { useState } from "react";
import MenuAdmin from "./MenuAdmin";

const MenuSidebar = () => {
  const [isOpenDashboard, setIsOpenDashboard] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  return (
    <div className="flex flex-col gap-5 dark:text-neutral-200 text-n-5">
      {/* Dashboard */}
      <div className="py-3 px-1 rounded-md flex items-center justify-between dark:hover:bg-n-8 hover:bg-neutral-100 transition-all duration-300">
        <div className="flex items-center gap-3">
          <TbLayoutDashboardFilled size={20} />
          <h2 className="text-base">Dashboard</h2>
        </div>
        <IoIosArrowUp size={16} className={`cursor-pointer ${isOpenDashboard ? "rotate-180" : ""} transition-transform ease-in-out duration-500`} onClick={() => setIsOpenDashboard(!isOpenDashboard)} />
      </div>

      {/* Admin */}
      <div className="py-3 px-1 rounded-md flex items-center justify-between dark:hover:bg-n-8 hover:bg-neutral-100 transition-all duration-300">
        <div className="flex items-center gap-3">
          <HiMiniUserGroup size={20} />
          <h2 className="text-base">Admin Management</h2>
        </div>
        <IoIosArrowUp size={16} onClick={() => setIsOpenAdmin(!isOpenAdmin)} className={`cursor-pointer ${isOpenAdmin ? "rotate-180" : ""} transition-transform ease-in-out duration-500`} />
      </div>
      {isOpenAdmin && <MenuAdmin />}

      {/* Product */}
      <div className="py-3 px-1 rounded-md flex items-center justify-between dark:hover:bg-n-8 hover:bg-neutral-100 transition-all duration-300">
        <div className="flex items-center gap-3">
          <HiShoppingBag size={20} />
          <h2 className="text-base">Product</h2>
        </div>
        <IoIosArrowUp size={16} onClick={() => setIsOpenProduct(!isOpenProduct)} className={`cursor-pointer ${isOpenProduct ? "rotate-180" : ""} transition-transform ease-in-out duration-500`} />
      </div>
    </div>
  );
};

export default MenuSidebar;
