import axios from "axios";
import { errorToast } from "./toasts";

export const getRequest = async (url) => {
  try {
    const response = await axios.get("http://localhost:4000/api" + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
    throw error;
  }
};

export const postRequest = async (url, data, type) => {
  try {
    const response = await axios.post("http://localhost:4000/api" + url, data, {
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
    throw error;
  }
};

export const putRequest = async (url, data, type) => {
  try {
    const response = await axios.put("http://localhost:4000/api" + url, data, {
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    errorToast(error.response.data.error);
    throw error;
  }
};
