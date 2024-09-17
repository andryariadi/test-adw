"use client";

import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { GiPirateGrave } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddUser from "src/hooks/useAddUser";
import { BiLoader } from "react-icons/bi";
import GenderCheckbox from "./GenderCheckbox";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  gender: z.string().min(1, { message: "Gender is required!" }),
  email: z.string().min(1, { message: "Email is required!" }).email(),
  password: z.string().min(1, { message: "Password is required!" }).min(5, { message: "Password must be at least 5 characters" }),
  address: z.object({
    address: z.string().min(1, { message: "Address is required!" }),
  }),
  age: z.string().min(1, { message: "Age is required!" }),
});

const UserForm = ({ isOpen, setIsOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  const { createUserForm } = useAddUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSubmitUser = async (data) => {
    await createUserForm(data);
  };

  const handleCheckboxChange = (gender) => {
    setValue("gender", gender);
    setSelectedGender(gender);
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
    router.refresh();
  };

  return (
    <div className="bg-n-8/40 backdrop-blur absolute inset-0 z-50 flex items-center justify-center">
      <form role="form" onSubmit={handleSubmit(handleSubmitUser)} className="relative dark:bg-n-7 bg-white flex flex-col gap-10 w-1/2 p-6 border border-n-1/10 rounded-md">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="add-user">
            Add <span className="text-logo">User</span>
          </h1>
        </div>

        {/* Form Field */}
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div className="flex flex-1 flex-col gap-2 relative">
            <label className="text-sm text-n-3">Firstname</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" name="firstName" placeholder="John" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none  placeholder:text-xs placeholder:text-n-4/60 text-xs" {...register("firstName")} />
              <CiUser size={35} className="pe-3 text-n-4/60" />
            </div>
            {errors.firstName && (
              <span data-testid="firstName-error" className="text-rose-500 text-xs absolute -bottom-5">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 relative">
            <label className="text-sm text-n-3">Lastname</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" name="lastName" placeholder="Doe" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none  placeholder:text-xs placeholder:text-n-4/60 text-xs" {...register("lastName")} />
              <CiUser size={33} className="pe-3 text-n-4/60" />
            </div>
            {errors.lastName && (
              <span data-testid="lastName-error" className="text-rose-500 text-xs absolute -bottom-5">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 relative">
            <label className="text-sm text-n-3">Email</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input type="text" name="email" placeholder="Email@example.com" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none  placeholder:text-xs placeholder:text-n-4/60 text-xs" {...register("email")} />
              <CiMail size={35} className="pe-3 text-n-4/60" />
            </div>
            {errors.email && (
              <span data-testid="email-error" className="text-rose-500 text-xs absolute -bottom-5">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm text-n-3">
              Password
            </label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input
                id="password"
                type={!showPassword ? "password" : "text"}
                name="password"
                placeholder="Enter your password"
                className="flex-1 p-4 rounded-lg dark:bg-n-7 bg-neutral-200 outline-none  placeholder:text-xs placeholder:text-n-4/60 text-xs"
                {...register("password")}
              />
              <div className="bg-ros-500 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <button type="button" data-testid="password-toggle">
                    <IoEyeOutline size={35} className="pe-3 text-n-4/60" />
                  </button>
                ) : (
                  <button type="button" data-testid="password-toggle">
                    <IoEyeOffOutline size={35} className="pe-3 text-n-4/60" />
                  </button>
                )}
              </div>
            </div>
            {errors.password && (
              <span data-testid="password-error" className="text-rose-500 text-xs absolute -bottom-5">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 relative">
            <label className="text-sm text-n-3">Address</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input
                data-testid="address"
                type="text"
                name="address.address"
                placeholder="Jl..."
                className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none  placeholder:text-xs placeholder:text-n-4/60 text-xs"
                {...register("address.address")}
              />
              <CiLocationOn size={35} className="pe-3 text-n-4/60" />
            </div>
            {errors.address && (
              <span data-testid="address-error" className="text-rose-500 text-xs absolute -bottom-5">
                {errors.address.address.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-2 relative">
            <label className="text-sm text-n-3">Age</label>
            <div className="flex items-center rounded-lg dark:bg-n-7 bg-neutral-200 gap-3 border border-n-1/10 hover:border-logo transition-all duration-300">
              <input data-testid="age" type="text" name="age" placeholder="Age" className="flex-1 p-4 rounded-s-lg dark:bg-n-7 bg-neutral-200 outline-none  placeholder:text-xs placeholder:text-n-4/60 text-xs" {...register("age")} />
              <GiPirateGrave size={35} className="pe-3 text-n-4/60" />
            </div>
            {errors.age && (
              <span data-testid="age-error" className="text-rose-500 text-xs absolute -bottom-5">
                {errors.age.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={selectedGender} errors={errors} data-testid="gender-checkbox" />
          </div>

          <button disabled={isSubmitting} type="submit" className={`p-2 rounded-md bg-logo ${isSubmitting ? "opacity-50" : ""} text-n-1 w-full`}>
            {isSubmitting ? <BiLoader size={22} className="animate-spin mx-auto" /> : "Submit"}
          </button>

          <IoCloseCircle size={30} className="absolute -top-[0.4rem] -right-[0.3rem] text-logo cursor-pointer" onClick={handleClose} data-testid="close-icon" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
