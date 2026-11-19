import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLecturers } from "../../context/LecturerContext";

export default function LecturerList() {
  const { getLecturers, deleteLecturer } = useLecturers();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(""); // isi kolom pencarian
  const [search, setSearch] = useState(""); // kata kunci yang sedang aktif

  const { data, isLoading, isError } = useQuery({
    queryKey: ["lecturers", page, search],
    queryFn: () => getLecturers({ page, limit: 10, keyword: search }),
    placeholderData: keepPreviousData,
  });

  const lecturers = data?.data ?? [];
  const meta = data?.meta;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(keyword);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data dosen ini?")) return;
    try {
      await deleteLecturer.mutateAsync(id);
      toast.success("Data berhasil dihapus.");
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Gagal memuat data.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Data Dosen</h1>
        <Link
          to="/admin/lecturers/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Dosen
        </Link>
      </div>

      {/* Pencarian */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari nama / NIM / NIDN..."
          className="border rounded p-2 w-full max-w-sm"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded cursor-pointer">
          Cari
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Foto</th>
              <th className="p-2 border">NIM</th>
              <th className="p-2 border">NIDN</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Prodi</th>
              <th className="p-2 border">Level Pendidikan</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {lecturers.map((l, index) => (
              <tr key={l.id}>
                <td className="p-2 border">
                  {(meta.current_page - 1) * meta.per_page + index + 1}
                </td>
                <td className="p-2 border">
                  {l.photo_url ? (
                    <img src={l.photo_url} alt={l.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="p-2 border">{l.nim}</td>
                <td className="p-2 border">{l.nidn}</td>
                <td className="p-2 border">{l.name}</td>
                <td className="p-2 border">{l.prodi?.name}</td>
                <td className="p-2 border">{l.education_level?.name}</td>
                <td className="p-2 border space-x-2 whitespace-nowrap">
                  <Link to={`/admin/lecturers/${l.id}/edit`} className="text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="cursor-pointer text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {lecturers.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={meta.current_page === 1}
            onClick={() => setPage(meta.current_page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer"
          >
            Sebelumnya
          </button>
          <span>
            Halaman {meta.current_page} dari {meta.last_page} (total {meta.total})
          </span>
          <button
            disabled={meta.current_page === meta.last_page}
            onClick={() => setPage(meta.current_page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer"
          >
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}