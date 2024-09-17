import axios from "axios";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`https://dummyjson.com/users/${id}`);

      if (res.status === 200) {
        toast.success("User deleted successfully!");
        return res.data;
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user!");
    }
  };

  return { deleteUser };
};

export default useDeleteUser;
