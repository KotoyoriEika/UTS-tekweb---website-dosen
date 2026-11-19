import { Link } from "react-router-dom";

export default function Sidebar({ sidebarOpen }) {
  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md`}
    >
      <div className="p-4 font-bold text-xl">My Admin</div>

      <nav className="flex flex-col p-4 space-y-2">
        <Link to="/admin/dashboard" className="hover:bg-gray-200 p-2 rounded">
          Data Dosen
        </Link>
        <Link to="/admin/lecturers/create" className="hover:bg-gray-200 p-2 rounded">
          Tambah Dosen
        </Link>
        <Link to="/" className="hover:bg-gray-200 p-2 rounded">
          Halaman Depan
        </Link>
      </nav>
    </div>
  );
}