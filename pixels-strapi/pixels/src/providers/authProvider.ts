import type { AuthProvider } from "@refinedev/core";
import { strapiClient } from "../utility";

export const authProvider: AuthProvider = {
  login: async ({ email, password, providerName }) => {
    try {

      if (providerName) {

        return {
          success: false,
          error: {
            message: "OAuth login not implemented for Strapi",
            name: "OAuth Error",
          },
        };
      }


      const response = await strapiClient.post("/auth/local", {
        identifier: email,
        password,
      });

      if (response.data && response.data.jwt) {
        localStorage.setItem("authToken", response.data.jwt);
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.message || "Login failed",
          name: "Invalid email or password",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ email, password }) => {
    try {
      const randomUsername = `user_${Math.random().toString(36).substring(2, 4)}`;
      const response = await strapiClient.post("/auth/local/register", {
        email: email,
        password: password,
        username: randomUsername,
      });

      if (response.data && response.data.jwt) {
        localStorage.setItem("authToken", response.data.jwt);
        return {
          success: true,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.message || "Register failed",
          name: "Invalid email or password",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    try {
      const response = await strapiClient.post("/auth/forgot-password", {
        email,
      });

      if (response.data) {
        return { success: true };
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.message || "Forgot password failed",
          name: "Invalid email",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  updatePassword: async ({ password, code }) => {
    try {
      const response = await strapiClient.post("/auth/reset-password", {
        code,
        password,
        passwordConfirmation: password,
      });

      if (response.data) {
        return { success: true, redirectTo: "/" };
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.message || "Update password failed",
          name: "Invalid password",
        },
      };
    }

    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  logout: async () => {
    try {
      localStorage.removeItem("authToken");
      return { success: true, redirectTo: "/" };
    } catch (error: any) {
      return { success: false, error };
    }
  },
  onError: async (_error: any) => ({}),
  check: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Not authenticated",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
      // Optionally, verify token with Strapi
    } catch (error: any) {
      return {
        authenticated: false,
        error: error,
        logout: true,
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    try {
      const response = await strapiClient.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.data) {
        return response.data.role?.name;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  },
  getIdentity: async () => {
    try {
      const response = await strapiClient.get("/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.data) {
        return {
          ...response.data,
          name: response.data.email,
        };
      }
      return null;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  },
};

export default authProvider;
