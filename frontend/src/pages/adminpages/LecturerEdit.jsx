import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LecturerForm from "../../components/LecturerForm";
import { useLecturers } from "../../context/LecturerContext";

export default function LecturerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLecturerById, updateLecturer } = useLecturers();
  const [errors, setErrors] = useState({});

  const { data: lecturer, isLoading, isError } = useQuery({
    queryKey: ["lecturer", id],
    queryFn: () => getLecturerById(id),
  });

  const handleSubmit = async (data) => {
    setErrors({});
    try {
      await updateLecturer(id, data);
      toast.success("Data dosen berhasil diperbarui!");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal memperbarui data.");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Data tidak ditemukan.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Edit Dosen</h2>
      <LecturerForm
        initial={{
          nim: lecturer.nim,
          nidn: lecturer.nidn,
          name: lecturer.name,
          email: lecturer.email,
          phone: lecturer.phone,
          address: lecturer.address ?? "",
          prodi_id: lecturer.prodi.id,
          education_level_id: lecturer.education_level.id,
          photo: null,
        }}
        currentPhoto={lecturer.photo_url}
        onSubmit={handleSubmit}
        errors={errors}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}