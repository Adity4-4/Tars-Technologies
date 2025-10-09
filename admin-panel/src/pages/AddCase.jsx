import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";

import Sidebar from '../components/Sidebar'

function AddCase() {
  const [cases, setCases] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    images: [], // cloudinary images
    title: "",
    description: "",
    details: { problemBefore: "", problemSolved: "", whatWeAdd: "" }
  });

  const formRef = useRef(null);

  // cloudinary image upload
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    try {
      const uploadedImages = [];

      for (let file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post("http://localhost:5000/api/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.success) {
          uploadedImages.push({
            url: res.data.data.secure_url,
            public_id: res.data.data.public_id
          });
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedImages]
      }));

    } catch (err) {
      console.error("Image upload error: ", err);
    } finally {
      setUploading(false);
    }
  }

  // Delete image from cloudinary
  const handleRemoveImage = (public_id) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.public_id !== public_id)
    }));
  }

  // Fetch cases
  const fetchCases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cases");
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  // Handle form input
  const handleChange = (e, isDetails = false) => {
    const { name, value } = e.target;
    if (isDetails) {
      setFormData({ ...formData, details: { ...formData.details, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add new case
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/cases", formData);
      setFormData({ images: [], title: "", description: "", details: { problemBefore: "", problemSolved: "", whatWeAdd: "" } });
      fetchCases();
    } catch (err) {
      console.error("Error submitting case:", err);
    }
  };

  // Save edited case
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/cases/${id}`, formData);
      setEditingId(null);
      setFormData({ images: [], title: "", description: "", details: { problemBefore: "", problemSolved: "", whatWeAdd: "" } });
      fetchCases();
    } catch (err) {
      console.error("Error updating case:", err);
    }
  };

  // Delete case
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cases/${id}`);
        fetchCases();
      } catch (err) {
        console.error("Error deleting case:", err);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-8 md:pl-80 lg:pl-85 pt-24 md:pt-10 lg:pt-20 bg-gradient-to-l from-black to-[#1E1E1E] text-gray-300 min-h-screen pr-8 md:pr-8 lg:pr-16">
        <h1 className='text-[25px] md:text-[35px] font-bold mb-6'>Add / Edit Cases</h1>

        {/* Add / Edit Form */}
        <form ref={formRef} onSubmit={editingId ? (e) => { e.preventDefault(); handleSave(editingId); } : handleSubmit} className='w-full lg:w-[450px] flex flex-col gap-4 mb-10'>
          {/* Image Upload */}
          <h3 className="font-semibold">Case's Images</h3>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleImageUpload}
            className='border border-gray-700 rounded-md p-2 w-full'
          />
          {uploading && <p className='text-gray-400 mt-2'>Uploading...</p>}
          <div className='flex gap-3 flex-wrap mt-3'>
            {formData.images?.map((img) => (
              <div key={img.public_id} className='relative'>
                <img src={img.url} alt='preview' className='w-24 h-24 object-cover rounded' />
                <button type='button' onClick={() => handleRemoveImage(img.public_id)} className='absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded ' >✕</button>
              </div>
            ))}
          </div>

          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Title'
            className='bg-transparent border border-gray-600 p-2 rounded-sm'
            required
          />
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Description'
            className='bg-transparent border border-gray-600 h-[120px] p-2 rounded-sm'
            required
          />
          <input
            type='text'
            name='problemBefore'
            value={formData.details.problemBefore}
            onChange={(e) => handleChange(e, true)}
            placeholder='Problem Before'
            className='bg-transparent border border-gray-600 p-2 rounded-sm'
            required
          />
          <input
            type='text'
            name='problemSolved'
            value={formData.details.problemSolved}
            onChange={(e) => handleChange(e, true)}
            placeholder='Problem Solved'
            className='bg-transparent border border-gray-600 p-2 rounded-sm'
            required
          />
          <input
            type='text'
            name='whatWeAdd'
            value={formData.details.whatWeAdd}
            onChange={(e) => handleChange(e, true)}
            placeholder='What We Add'
            className='bg-transparent border border-gray-600 p-2 rounded-sm'
            required
          />
          <button
            type='submit'
            className='hover:bg-[#a2a0a0] bg-gray-300 text-black p-2 rounded-sm'
          >
            {editingId ? 'Save Changes' : 'Add Case'}
          </button>
          {editingId && (
            <button
              type='button'
              onClick={() => { setEditingId(null); setFormData({ title: "", description: "", details: { problemBefore: "", problemSolved: "", whatWeAdd: "" } }) }}
              className='bg-gray-500 hover:bg-gray-400 text-white p-2 rounded-sm'
            >
              Cancel
            </button>
          )}
        </form>

        {/* Display Cases */}
        <h2 className='text-[20px] md:text-[28px] font-bold mb-4'>Existing Cases</h2>
        <div className='flex flex-wrap gap-8'>
          {cases.length > 0 ? cases.map((item) => (
            <div key={item._id} className='bg-[#1E1E1E] p-4 rounded w-full md:w-[45%]'>
              <div className="flex gap-3 flex-wrap mt-3">
                {item.images && item.images.length > 0 && item.images.map((img) => (
                  <div key={img.public_id || img.url} className="relative">
                    <img src={img.url} alt="blog" className="w-24 h-24 object-cover rounded" />
                  </div>
                ))}
              </div>
              <h3 className='text-[18px] font-semibold'>{item.title}</h3>
              <p className='text-gray-400 mt-1'>{item.description}</p>
              <p className='text-gray-400 mt-2'><strong>Problem Before:</strong> {item.details?.problemBefore || '-'}</p>
              <p className='text-gray-400'><strong>Problem Solved:</strong> {item.details?.problemSolved || '-'}</p>
              <p className='text-gray-400'><strong>What We Add:</strong> {item.details?.whatWeAdd || '-'}</p>

              <div className='flex gap-2 mt-4 text-[14px] md:text-[16px] '>
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setFormData({
                      images: item.images || [],
                      title: item.title,
                      description: item.description,
                      details: { ...item.details }
                    });

                    // Scroll to form
                    setTimeout(() => {
                      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }, 200)
                  }}

                  className='bg-blue-500 hover:bg-blue-400 px-2 md:px-3 py-1 rounded-sm text-white'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className='bg-red-500 hover:bg-red-400 px-2 md:px-3 py-1 rounded-sm text-white'
                >
                  Delete
                </button>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 py-6">No Cases Added</p>
          )}
        </div>
      </div>
    </>
  );
}

export default AddCase;
