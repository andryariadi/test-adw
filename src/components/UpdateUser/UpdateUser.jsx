"use client";

import { CiUser, CiMail, CiLocationOn } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";
import { GiPirateGrave } from "react-icons/gi";
import { BsGenderTrans } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiLoader } from "react-icons/bi";
import useUsersStore from "src/libs/storeUser";
import useUpdateUser from "src/hooks/useUpdateUser";

const UpdateUser = ({ user, isOpen, setIsOpen }) => {
  const router = useRouter();
  const { updateUserForm } = useUpdateUser();
  const { users } = useUsersStore();

  const userFromUpdate = users.find((u) => u.id === user.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: userFromUpdate ? userFromUpdate.firstName : user.firstName || "",
      lastName: userFromUpdate ? userFromUpdate.lastName : user.lastName || "",
      gender: userFromUpdate ? userFromUpdate.gender : user.gender || "",
      age: userFromUpdate ? userFromUpdate.age : user.age || "",
      email: userFromUpdate ? userFromUpdate.email : user.email || "",
      address: userFromUpdate ? userFromUpdate.address.address : user.address.address || "",
    },
  });

  const handleSubmitUser = async (data) => {
    const updatedData = {
      ...data,
      address: {
        address: data.address,
      },
    };
    await updateUserForm({ id: user.id, ...updatedData });
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
    router.refresh();
  };

  return (
    <div data-testid="update-modal" className="bg-n-8/40 backdrop-blur absolute inset-0 flex items-center justify-center">
      <form role="form" onSubmit={handleSubmit(handleSubmitUser)} className="relative dark:bg-n-7 bg-white flex flex-col gap-10 w-[40%] p-6 border border-n-1/10 rounded-md">
        <div>
          <h1 data-testid="update-user" className="text-2xl font-semibold">
            Update <span className="text-logo">User</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">First Name</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("firstName")} placeholder="First Name" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiUser size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Last Name</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("lastName")} placeholder="Last Name" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiUser size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Email</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("email")} placeholder="Email" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiMail size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Address</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("address")} placeholder="Jl..." className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <CiLocationOn size={35} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Gender</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("gender")} placeholder="Gender" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <BsGenderTrans size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-sm text-n-3">Age</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" {...register("age")} placeholder="Age" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none placeholder:text-xs placeholder:text-n-4/60 text-xs" />
              <GiPirateGrave size={33} className="pe-3 text-n-4/60" />
            </div>
          </div>

          <button disabled={isSubmitting} type="submit" className="p-2 rounded-md bg-logo text-n-1 w-full">
            {isSubmitting ? <BiLoader size={22} className="animate-spin mx-auto" /> : "Update"}
          </button>

          <IoCloseCircle data-testid="close-button" size={30} className="absolute -top-[0.4rem] -right-[0.3rem] text-logo cursor-pointer" onClick={handleClose} />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
