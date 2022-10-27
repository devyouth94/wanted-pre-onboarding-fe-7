import instance from "./instance";

export const authAPI = {
  signup: (user) => {
    instance.post("/auth/signup", user);
  },

  signin: (user) => {
    return instance.post("/auth/signin", user);
  },
};
