"use client";

import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
import UpdateUser from "../UpdateUser/UpdateUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { notFound, useRouter } from "next/navigation";
import { getUserById } from "src/libs/data";
import useUsersStore from "src/libs/storeUser";
import useCurrentUserStore from "src/libs/storeAuth";
import useDeleteUser from "src/hooks/useDeleteUser";

const TrBody = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  const { users, removeUser } = useUsersStore();
  const { currentUser } = useCurrentUserStore();
  const { deleteUser } = useDeleteUser();

  useEffect(() => {
    if (users) return;
  }, [users]);

  if (!users) return notFound();

  const handleEditClick = async (id) => {
    if (currentUser?.id !== id) {
      toast.error("You are not allowed to edit this user!");
      return;
    }

    const user = await getUserById(id);
    setSelectedUser(user);
    setIsOpen(!isOpen);
  };

  const handleDeleteClick = async (id) => {
    if (currentUser?.role !== "admin") {
      toast.error("You are not admin, you cannot delete user!");
      return;
    }

    await deleteUser(id);
    removeUser(id);
  };

  const handleProfileClick = (id) => {
    if (currentUser?.id !== id) {
      toast.error("You are not allowed to view this profile!");
    } else {
      router.push(`/user/${id}`);
    }
  };

  return (
    <>
      {users.map((user) => (
        <tr key={user.id} className="border-b dark:border-n-1/10 border-n-2/50">
          <th className="text-start py-3 md:w-[40%] lg:w-[20%] 2xl:w-[20%] capitalize">
            {user.firstName} {user.lastName}
          </th>
          <th className="hidden md:table-cell text-start py-3 md:w-[20%] lg:w-[10%] 2xl:w-[5%]">{user.age}</th>
          <th className="text-start py-3 md:w-[20%] lg:w-[10%] 2xl:w-[7%] capitalize">{user.gender}</th>
          <th className="hidden lg:table-cell text-start py-3 lg:w-[27%] 2xl:w-[20%]">{user.address.address}</th>
          <th className="hidden xl:table-cell text-start py-3 xl:w-[17%] 2xl:w-[23%]">{user.email}</th>
          <th className="text-start py-3 md:w-[20%] lg:w-[16%] 2xl:w-[10%]">
            <div className="flex justify-between">
              <button type="button" data-testid="profile-button" onClick={() => handleProfileClick(user.id)}>
                <HiViewGrid size={20} className="cursor-pointer text-teal-500" />
              </button>

              <button type="button" data-testid="edit-button" onClick={() => handleEditClick(user.id)}>
                <MdModeEditOutline size={20} className="cursor-pointer text-logo" />
              </button>

              <button type="button" data-testid="delete-button" onClick={() => handleDeleteClick(user.id)}>
                <AiFillDelete size={20} className="cursor-pointer text-rose-500" />
              </button>
            </div>

            {isOpen && <UpdateUser user={selectedUser} isOpen={isOpen} setIsOpen={setIsOpen} />}
          </th>
        </tr>
      ))}
    </>
  );
};

export default TrBody;
