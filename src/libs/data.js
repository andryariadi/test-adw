import axios from "axios";

export const getUsers = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/users");
    return res.data.users;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id) => {
  try {
    const res = await axios.get(`https://dummyjson.com/users/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchUsers = async (query) => {
  try {
    const res = await axios.get(`https://dummyjson.com/users/search?q=${query}`);
    return res.data.users;
  } catch (error) {
    console.log(error);
  }
};

export const sortUsers = async ({ sort, order }) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users`, {
      params: { sortBy: sort, order: order },
    });

    return response.data.users;
  } catch (error) {
    console.error("Error sorting users:", error);
    throw error;
  }
};
