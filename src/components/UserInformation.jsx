"use client";

import Image from "next/image";
import { useContext, useEffect } from "react";
import { AuthContext } from "src/context/AuthContext";
import useCurrentUserStore from "src/libs/storeAuth";
import useUsersStore from "src/libs/storeUser";
import Loading from "./Loader";
import Cookies from "js-cookie";

const UserInformation = () => {
  const { currentUser } = useContext(AuthContext);
  const { users } = useUsersStore();
  const { setUser } = useCurrentUserStore();

  const user = currentUser && users ? users.find((user) => user.id === currentUser.id) : null;

  useEffect(() => {
    if (user) {
      const cookieUser = Cookies.get("user");

      if (!cookieUser) {
        Cookies.set("user", JSON.stringify(user), { expires: 30, path: "/" });
        setUser(user);
      } else {
        try {
          const parsedUser = JSON.parse(cookieUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing cookie: ", error);
        }
      }
    }
  }, [user, setUser]);

  const cookieUser = Cookies.get("user");
  let userCookie = null;

  if (cookieUser) {
    try {
      userCookie = JSON.parse(cookieUser);
    } catch (error) {
      console.error("Error parsing user cookie:", error);
    }
  }

  if (!user || !currentUser) return <Loading />;

  return (
    <div className="dark:text-neutral-200 text-n-5 h-24 flex items-center justify-start">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="dark:bg-n-7 bg-neutral-50 p-[6px] border dark:border-n-1/10 border-n-2 rounded-full flex items-center justify-center">
          <Image src={user.image || "/noAvatar.png"} alt="Profile" width={32} height={32} className="rounded-full object-cover w-8 h-w-8" />
        </div>
        {/* User Information */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
          <span className="text-xs dark:text-n-3 text-n-4">{user.company?.title || userCookie?.company?.title || "No Company Info"}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
