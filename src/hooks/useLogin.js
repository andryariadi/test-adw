"use client";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const useLogin = () => {
  const { setCurrentUser } = useContext(AuthContext);

  const loginForm = async ({ username, password }) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      if (res?.data) {
        Cookies.remove("token");
        Cookies.remove("currentUser");
        setCurrentUser(null);

        setCurrentUser(res.data);

        Cookies.set("token", res.data.token, { expires: 30, sameSite: "strict" });

        Cookies.set("currentUser", JSON.stringify(res.data), { expires: 30, sameSite: "strict" });

        toast.success("Login successful!");

        return res.data;
      } else {
        toast.error("Login failed. No data received.");
      }
    } catch (error) {
      console.log(error);
      Cookies.remove("token");
      Cookies.remove("currentUser");
      setCurrentUser(null);

      toast.error("Login failed. Please try again.");
    }
  };

  return { loginForm };
};

export default useLogin;
