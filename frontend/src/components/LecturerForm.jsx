import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLecturers } from "../context/LecturerContext";

const emptyForm = {
  nim: "",
  nidn: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  prodi_id: "",
  education_level_id: "",
  photo: null,
};

const textFields = [
  { name: "nim", label: "NIM", type: "text" },
  { name: "nidn", label: "NIDN", type: "text" },
  { name: "name", label: "Nama Lengkap", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "No. HP", type: "text" },
];

export default function LecturerForm({
  initial = emptyForm,
  onSubmit,
  errors = {},
  submitLabel = "Simpan",
  currentPhoto = null,
}) {
  const { getProdis, getEducationLevels } = useLecturers();
  const [form, setForm] = useState(initial);

  const { data: prodis = [] } = useQuery({ queryKey: ["prodis"], queryFn: getProdis });
  const { data: levels = [] } = useQuery({ queryKey: ["education-levels"], queryFn: getEducationLevels });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "photo") {
        if (value) data.append("photo", value); // kirim hanya kalau ada file baru
      } else {
        data.append(key, value ?? "");
      }
    });
    onSubmit(data);
  };

  const inputClass = (name) =>
    `border rounded-md p-2 w-full ${errors[name] ? "border-red-500" : ""}`;

  const ErrorText = ({ name }) =>
    errors[name] ? <p className="text-red-500 text-sm mt-1">{errors[name][0]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {textFields.map((f) => (
        <div key={f.name} className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">{f.label}</label>
          <input
            name={f.name}
            type={f.type}
            value={form[f.name]}
            onChange={handleChange}
            className={inputClass(f.name)}
          />
          <ErrorText name={f.name} />
        </div>
      ))}

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Alamat</label>
        <textarea
          name="address"
          rows="3"
          value={form.address}
          onChange={handleChange}
          className={inputClass("address")}
        />
        <ErrorText name="address" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Program Studi</label>
        <select
          name="prodi_id"
          value={form.prodi_id}
          onChange={handleChange}
          className={inputClass("prodi_id")}
        >
          <option value="">-- Pilih Program Studi --</option>
          {prodis.map((p) => (
            <option key={p.prodi_id} value={p.prodi_id}>
              {p.name}
            </option>
          ))}
        </select>
        <ErrorText name="prodi_id" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Level Pendidikan</label>
        <select
          name="education_level_id"
          value={form.education_level_id}
          onChange={handleChange}
          className={inputClass("education_level_id")}
        >
          <option value="">-- Pilih Level Pendidikan --</option>
          {levels.map((l) => (
            <option key={l.education_level_id} value={l.education_level_id}>
              {l.name}
            </option>
          ))}
        </select>
        <ErrorText name="education_level_id" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-1">Foto</label>
        {currentPhoto && (
          <img src={currentPhoto} alt="Foto saat ini" className="w-24 h-24 object-cover rounded mb-2" />
        )}
        <input
          name="photo"
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleChange}
          className="border rounded-md p-2 bg-gray-50"
        />
        <ErrorText name="photo" />
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
      >
        {submitLabel}
      </button>
    </form>
  );
}