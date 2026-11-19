import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        MyApp
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-200">
          Beranda
        </Link>
        <Link to="/admin/dashboard" className="hover:text-gray-200">
          Admin
        </Link>
      </div>
    </nav>
  );
}