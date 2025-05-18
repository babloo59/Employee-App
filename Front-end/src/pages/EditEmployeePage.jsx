import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    title: "",
    department: "",
    role: "",
  });

  // Fetch employee data to prefill
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://employee-app-ie4s.onrender.com/api/v1/getUser/${id}`, {method:"GET", headers:{"Content-Type":"application/json"}});
        const data = await res.json();

        setFormData({
          name: data.data.name,
          email: data.data.email,
          image: data.data.image,
          title: data.data.title,
          department: data.data.department,
          role: data.data.role,
        });
      } catch (error) {
        toast.error("Failed to fetch employee data.");
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating...");

    try {
      const res = await fetch(`https://employee-app-ie4s.onrender.com/api/v1/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Employee updated successfully", { id: loadingToast });
        navigate("/");
      } else {
        toast.error("Update failed", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Error updating employee", { id: loadingToast });
      console.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-800"
      style={{ padding: "1rem" }}
    >
      <div className="max-w-xl w-full p-6 dark:bg-gray-800 border-gray-500 border-2 shadow rounded">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Edit Employee</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded text-yellow-500 bg-black placeholder-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded text-yellow-500 bg-black placeholder-yellow-500"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded text-yellow-500 bg-black placeholder-yellow-500"
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded text-yellow-500 bg-black placeholder-yellow-500"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded text-yellow-500 bg-black placeholder-yellow-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
