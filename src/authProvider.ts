import type { AuthBindings } from "@refinedev/core";

import axios from "axios";
export const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
//   const token = JSON.parse(localStorage.getItem("auth"));
//   if (request.headers) {
//     request.headers["Authorization"] = `Bearer ${token}`;
//   } else {
//     // Create the headers property if it does not exist
//     request.headers = {
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   return request;
// });

const mockUser = [
  {
    email: "john@mail.com",
    roles: ["admin"],
    token: "123",
    password: "18Februari2020!",
  },
  {
    email: "jane@mail.com",
    roles: ["developer"],
    token: "321",
    password: "12345678",
  },
];

const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const user = mockUser.find(
      (item) => item.email === email && item.password === password
    );
    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${user.token}`,
      };
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Login Error",
        name: "Invalid email or password",
      },
    };
  },
  check: async () => {
    const user = localStorage.getItem("auth");

    if (user) {
      return { authenticated: true };
    }
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return { logout: true, redirectTo: "/login", error };
    }
    return {};
  },
  getPermissions: async () => {
    const user = localStorage.getItem("auth");
    if (user) {
      const { roles } = JSON.parse(user);
      return roles;
    }
    return null;
  },
  getIdentity: async () => {
    const user = localStorage.getItem("auth");
    if (user) {
      const { email, roles } = JSON.parse(user);
      return { email, roles };
    }
    return null;
  },
  register: async ({ email, password }) => {
    const user = mockUser.find((user) => user.email === email);

    if (user) {
      return {
        success: false,
        error: {
          name: "Register Error",
          message: "User already exist",
        },
      };
    }
    mockUser.push({ email, roles: ["user"], token: "432", password });
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  // forgotPassword: ({ email }) => {
  // send password reset link to the user's email address here

  // if request is successful
  // return {
  //   success: true,
  //   redirectTo: "/login",
  // };

  // if request is not successful
  // return {
  //   success: false,
  //   error: {
  //     name: "Forgot Password Error",
  //     message: "Email address does not exist",
  //   },
  // };
  // },
};

export default authProvider;
