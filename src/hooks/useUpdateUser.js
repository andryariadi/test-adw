"use client";

import axios from "axios";
import toast from "react-hot-toast";
import useUsersStore from "src/libs/storeUser";

const useUpdateUser = () => {
  const { inUpdateUser } = useUsersStore();
  const updateUserForm = async ({ id, firstName, lastName, gender, age, email, address }) => {
    try {
      const res = await axios.put(`https://dummyjson.com/users/${id}`, {
        firstName,
        lastName,
        gender,
        age,
        email,
        address,
      });

      if (res.status === 200) {
        inUpdateUser(res.data);
        toast.success("User updated successfully!");
        return res.data;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user!");
    }
  };

  return { updateUserForm };
};

export default useUpdateUser;
