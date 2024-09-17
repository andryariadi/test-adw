"use client";

import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import useSortStore from "src/libs/storeSort";
import UserForm from "../UserForm/UserForm";
import useAuthStore from "src/libs/storeAuth";
import toast from "react-hot-toast";

const AddUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { input, setInput } = useSortStore();

  const { currentUser } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ [name]: value });
  };

  const handleAddUserClick = async () => {
    if (currentUser?.role !== "admin") {
      toast.error("You are not admin, you cannot add user!");
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="border-b border-n-1/10 px-5 py-2 w-full flex items-center justify-between gap-5">
        <h1 className="text-md md:text-xl">User Lists</h1>

        <div className="flex items-center justify-between gap-2 md:gap-5">
          <select
            id=""
            name="sort"
            aria-label="Sort By"
            value={input.sort}
            onChange={handleInputChange}
            className="dark:bg-n-7 bg-white backdrop-blur-md py-2 px-2 md:px-4 rounded-2xl font-medium text-xs dark:text-n-3 text-n-4 border dark:border-n-1/10 border-n-2 transition-all duration-500 ease-in-out dark:hover:border-logo cursor-pointer"
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="age">Age</option>
            <option value="university">University</option>
            <option value="address">Address</option>
          </select>

          <select
            id=""
            name="order"
            aria-label="Order By"
            value={input.order}
            onChange={handleInputChange}
            className="dark:bg-n-7 bg-white backdrop-blur-md py-2 px-2 md:px-4 rounded-2xl font-medium text-xs dark:text-n-3 text-n-4 border dark:border-n-1/10 border-n-2 transition-all duration-500 ease-in-out dark:hover:border-logo cursor-pointer"
          >
            <option value="" disabled>
              Order By
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>

          <IoPersonAddSharp size={20} data-testid="add-user-icon" className="cursor-pointer hover:text-logo transition-all duration-300" onClick={handleAddUserClick} />
        </div>
      </div>

      {isOpen && <UserForm isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default AddUser;
