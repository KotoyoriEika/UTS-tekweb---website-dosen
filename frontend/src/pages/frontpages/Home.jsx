import { useState } from "react";
import toast from "react-hot-toast";
import LecturerForm from "../../components/LecturerForm";
import { useLecturers } from "../../context/LecturerContext";

export default function Home() {
  const { addLecturer } = useLecturers();
  const [errors, setErrors] = useState({});
  const [formKey, setFormKey] = useState(0); // key berubah = form dikosongkan kembali

  const handleSubmit = async (data) => {
    setErrors({});
    try {
      await addLecturer(data);
      toast.success("Data dosen berhasil ditambahkan!");
      setFormKey(formKey + 1);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan data.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
        Pendaftaran Data Dosen
      </h2>
      <LecturerForm
        key={formKey}
        onSubmit={handleSubmit}
        errors={errors}
        submitLabel="Simpan"
      />
    </div>
  );
}