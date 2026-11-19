import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/frontpages/Home";
import LecturerList from "./pages/adminpages/LecturerList";
import LecturerCreate from "./pages/adminpages/LecturerCreate";
import LecturerEdit from "./pages/adminpages/LecturerEdit";

export default function App() {
  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Halaman admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<LecturerList />} />
        <Route path="lecturers/create" element={<LecturerCreate />} />
        <Route path="lecturers/:id/edit" element={<LecturerEdit />} />
      </Route>
    </Routes>
  );
}