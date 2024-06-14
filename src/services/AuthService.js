import axios from "axios";

const API_BASE_URL = "https://portalify-backend.onrender.com/api";
const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const authHeaders = () => ({
  headers: {
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});

const AuthService = {
  login: async (user) => {
    try {
      sessionStorage.clear();
      const res = await apiService.post("/users/login", user);
      return res.data;
    } catch (error) {
      return { isAuthenticated: false, user: { email: "" } };
    }
  },
  loginWithGoogle: async (userData) => {
    try {
      sessionStorage.clear();
      const res = await apiService.post("/users/login", userData);
      return res.data;
    } catch (error) {
      return { isAuthenticated: false, user: { email: "" } };
    }
  },
  forgotPassword: async (email) => {
    try {
      const res = await apiService.post("/users/forgotpass", { email });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  register: async (user) => {
    try {
      sessionStorage.clear();
      const res = await apiService.post("/users/register", user);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async ({ password, confirmPassword, resetToken, email }) => {
    try {
      const res = await apiService.post("/users/resetpassword", {
        password,
        confirmPassword,
        resetToken,
        email,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  isAuthenticated: async () => {
    try {
      let token = "";
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
      }
      if (token) {
        const res = await apiService.get(
          "/users/isAuthenticated",
          authHeaders()
        );
        return res.data;
      } else {
        return { isAuthenticated: false, user: { email: "" } };
      }
    } catch (error) {
      return { isAuthenticated: false, user: { email: "" } };
    }
  },
  checkAuthenticated: async (user) => {
    try {
      if (!user) throw new Error("user is required");
      return await apiService.post(
        "/users/checkAuthenticated",
        {},
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      localStorage.removeItem("token");
      const res = await apiService.get("/users/logout", authHeaders());
      return res.data;
    } catch (error) {
      throw error;
    }
  },
  getAllForms: async () => {
    try {
      return await apiService.get("/forms/forms");
    } catch (error) {
      throw error;
    }
  },
  getFormById: async (formID) => {
    try {
      return await apiService.get(`/forms/forms/${formID}`);
    } catch (error) {
      throw error;
    }
  },
  getFormByVersion: async (formID, version) => {
    try {
      return await apiService.get(`/forms/forms/${formID}/version/${version}`);
    } catch (error) {
      throw error;
    }
  },
  rollbackToVersion: async (formID, version) => {
    try {
      return await apiService.get(`/forms/forms/${formID}/rollback/${version}`);
    } catch (error) {
      throw error;
    }
  },
  addNewForm: async (form) => {
    try {
      return await apiService.post("/forms/addform", form, authHeaders());
    } catch (error) {
      throw error;
    }
  },
  getUserForms: async (userId) => {
    try {
      return await apiService.get(`/forms/forms/user/${userId}`, authHeaders());
    } catch (error) {
      throw error;
    }
  },
  addNewTemplate: async (form) => {
    try {
      return await apiService.post(
        "/templates/addtemplate",
        form,
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },
  publishStatusUpdate: async (formID, isPublished) => {
    try {
      return await apiService.post(
        "/templates/publishStatusUpdate",
        { formID, isPublished },
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },

  getTemplates: async () => {
    try {
      return await apiService.get("/templates/templates", authHeaders());
    } catch (error) {
      throw error;
    }
  },
  getTemplateById: async (formID) => {
    try {
      return await apiService.get(
        `/templates/templates/${formID}`,
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },
  deleteTemplate: async (formID) => {
    try {
      return await apiService.post(
        "/templates/deleteTemplate",
        { formID },
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },
  getAllCategories: async () => {
    try {
      return await apiService.get("/forms/categories");
    } catch (error) {
      throw error;
    }
  },
  addCategory: async () => {
    try {
      return await apiService.post("forms/addCategory", {}, authHeaders());
    } catch (error) {
      throw error;
    }
  },
  addFormResponse: async (formResponse) => {
    try {
      return await apiService.post(
        "/forms/forms/addresponse",
        formResponse,
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },
  getAllResponses: async (formID) => {
    try {
      return await apiService.get(`/forms/forms/${formID}/responses`);
    } catch (error) {
      throw error;
    }
  },
  getSingleResponse: async (formID, responseId) => {
    try {
      return await apiService.get(
        `/forms/forms/${formID}/responses/${responseId}`
      );
    } catch (error) {
      throw error;
    }
  },
  resetPasswordWithCurrentPassword: async ({
    currentPassword,
    newPassword,
    confirmPassword,
    email,
  }) => {
    try {
      return await apiService.post(
        "/users/resetpassword/current",
        {
          currentPassword,
          newPassword,
          confirmPassword,
          email,
        },
        authHeaders()
      );
    } catch (error) {
      throw error;
    }
  },
  deleteForm: (formID) => {
    console.log(formID);
    return apiService.post("/forms/deleteForm", { formID });
  },
};

export default AuthService;
