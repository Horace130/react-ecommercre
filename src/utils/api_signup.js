import axios from "axios";
import { toast } from "sonner";
import { API_URL } from "../constants";

// add new product
export const addNewUser = async (name, email , password, confirmPassword) => {
  try {
    const response = await axios.post(API_URL + "/auth/signup", {
      name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
