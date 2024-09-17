"use client";

import { getUserById } from "src/libs/data";
import Image from "next/image";
import { HiUser } from "react-icons/hi2";
import { TbGenderTransgender } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import { HiPhone, HiUserGroup } from "react-icons/hi2";
import { IoSchoolSharp, IoLocation } from "react-icons/io5";
import { PiBagFill } from "react-icons/pi";
import { MdBloodtype } from "react-icons/md";
import useUsersStore from "src/libs/storeUser";
import { useEffect, useState } from "react";
import Loading from "src/components/Loader";

const DetailUser = ({ params }) => {
  const { id } = params;
  const { users } = useUsersStore();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userFromUpdate = users.find((u) => u.id === id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loading />;
  if (!user) return <div>User not found</div>;

  return (
    <>
      <div className="py-6 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-max md:h-full flex md:items-center md:justify-center">
        <div className="dark:bg-n-7 bg-white shadow-md border border-n-1/10 w-full h-max rounded-md flex flex-col md:flex-row items-center gap-5 p-3">
          {/* Right */}
          <div className="w-full md:w-[30%] flex flex-col items-center justify-center gap-3 border-b-2 md:border-b-0 py-2 md:border-e-2 dark:border-n-1/10 border-neutral-200">
            <div className="bg-n-8 border-2 border-n-1/10 rounded-full">
              <Image
                src={userFromUpdate?.image || user.image || "/noAvatar.png"}
                alt="Profile"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full
             object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-medium capitalize">{userFromUpdate?.username || user.username}</h1>
              <span className="text-sm text-n-3">{userFromUpdate?.company?.title || user.company.title}</span>
            </div>
          </div>

          {/* Left */}
          <div className="w-full md:w-[70%] h-[30%] flex flex-wrap items-center justify-between gap-y-10 md:gap-y-8 xl:gap-y-14 capitalize">
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <HiUser size={24} />
              <span>
                {userFromUpdate?.firstName || user.firstName} {userFromUpdate?.lastName || user.lastName}
              </span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <TbGenderTransgender size={24} />
              <span>{userFromUpdate?.gender || user.gender}</span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <MdBloodtype size={24} />
              <span>{userFromUpdate?.bloodGroup || user.bloodGroup}</span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <FaCalendarDays size={24} />
              <span>{userFromUpdate?.birthDate || user.birthDate}</span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <HiPhone size={24} />
              <span>{userFromUpdate?.phone || user.phone}</span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <HiUserGroup size={24} />
              <span>{userFromUpdate?.role || user.role}</span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <PiBagFill size={24} />
              <span>{userFromUpdate?.company?.department || user.company.department}</span>
            </div>
            <div className="w-[45%] xl:w-[30%] flex items-center gap-2 hover:text-logo transition-all duration-300">
              <IoLocation size={24} />
              <span>{userFromUpdate?.address?.state || user.address.state}</span>
            </div>
            <div className="w-[100%] xl:w-[30%] flex items-center justify-center gap-2 hover:text-logo transition-all duration-300">
              <IoSchoolSharp size={24} />
              <span>{userFromUpdate?.university || user.university}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailUser;
