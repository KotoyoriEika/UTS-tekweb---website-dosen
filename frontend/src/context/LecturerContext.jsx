import { createContext, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const LecturerContext = createContext();

export const LecturerProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // GET list dengan pagination + pencarian
  const getLecturers = async ({ page = 1, limit = 10, keyword = "" }) => {
    const res = await apiClient.get("/lecturers", { params: { page, limit, keyword } });
    return res.data; // { data: [...], meta: {...}, links: {...} }
  };

  // GET detail
  const getLecturerById = async (id) => {
    const res = await apiClient.get(`/lecturers/${id}`);
    return res.data.data;
  };

  // GET data dropdown
  const getProdis = async () => {
    const res = await apiClient.get("/prodis");
    return res.data;
  };

  const getEducationLevels = async () => {
    const res = await apiClient.get("/education-levels");
    return res.data;
  };

  // POST (dengan file)
  const addLecturer = async (formData) => {
    const res = await apiClient.post("/lecturers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    return res;
  };

  // UPDATE (dengan file) -> POST + _method=PUT
  const updateLecturer = async (id, formData) => {
    const res = await apiClient.post(`/lecturers/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    queryClient.invalidateQueries({ queryKey: ["lecturer"] });
    return res;
  };

  // DELETE
  const deleteLecturer = useMutation({
    mutationFn: async (id) => await apiClient.delete(`/lecturers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lecturers"] });
    },
  });

  return (
    <LecturerContext.Provider
      value={{
        getLecturers,
        getLecturerById,
        getProdis,
        getEducationLevels,
        addLecturer,
        updateLecturer,
        deleteLecturer,
      }}
    >
      {children}
    </LecturerContext.Provider>
  );
};

export const useLecturers = () => useContext(LecturerContext);