import axios from "axios";
import toast from "react-hot-toast";
import useUsersStore from "src/libs/storeUser";

const useAddUser = () => {
  const { addUser } = useUsersStore();
  const createUserForm = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", data);

      if (res.status === 200 || res.status === 201) {
        addUser(res.data);
        toast.success("User created successfully!");
        return res.data;
      } else {
        console.error("Error response:", res);
        toast.error("Failed to create user!");
      }
    } catch (error) {
      console.error("Error creating user:", error.res ? error.res.data : error.message);
      toast.error("Failed to create user!");
    }
  };

  return { createUserForm };
};

export default useAddUser;
