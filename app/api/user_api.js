import ApiManeger from "../api/ApiManeger";

export const user_login = async (data) => {
  try {
    const result = await ApiManeger.post("/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
