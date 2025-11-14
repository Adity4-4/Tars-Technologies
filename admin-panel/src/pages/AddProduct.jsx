import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // track product being edited
  const [formData, setFormData] = useState({
    images: [], // cloudinary images
    title: "",
    description: ""
  });

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
        })

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

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing product
        await axios.put(`http://localhost:5000/api/products/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Add new product
        await axios.post("http://localhost:5000/api/products", formData);
      }
      setFormData({ title: "", description: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setFormData({ 
      images: product.images || [],
      title: product.title, 
      description: product.description
    });
    setEditingId(product._id);
  };

  const handleCancelEdit = () => {
    setFormData({ 
      images: [], 
      title: "", 
      description: "" 
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-8 md:pl-80 lg:pl-85 pt-24 md:pt-10 lg:pt-20 bg-gradient-to-l from-black to-[#1E1E1E] text-gray-300 min-h-screen pr-8 md:pr-8 lg:pr-16">
        <h1 className='text-[25px] md:text-[35px] font-bold mb-6'>Add / Edit Product</h1>

        {/* ADD / EDIT FORM */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-6 md:w-[450px] ">
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
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className='border border-gray-700 rounded-md p-2 w-full'
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className='border border-gray-700 rounded-md p-2 w-full'
            required
          />
          <div className="flex gap-3">
            <button
              className='hover:bg-[#a2a0a0] bg-gray-300 text-black px-2 py-1 rounded-sm'
              type="submit"
            >
              {editingId ? "Update Product" : "Save Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="hover:bg-gray-700 bg-gray-500 text-white p-2 rounded-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* PRODUCTS LIST */}
        <h2 className="text-lg font-semibold mb-3">Products List</h2>
        {products.length > 0 ? (
          <ul className="space-y-3 flex flex-wrap gap-10">
            {products.map((p) => (
              <li
                key={p._id}
                className="bg-[#1E1E1E] p-4 rounded flex flex-col w-full md:w-[450px]"
              >
                <div className="flex gap-3 flex-wrap mt-3">
                  {p.images && p.images.length > 0 && p.images.map((img) => (
                    <div key={img.public_id || img.url} className="relative">
                      <img src={img.url} alt="blog" className="w-24 h-24 object-cover rounded" />
                    </div>
                  ))}
                </div>
                <p className="text-gray-400"><strong>Title:</strong> {p.title}</p>
                <p className="text-sm text-gray-400"><strong>Description:</strong> {p.description}</p>
                <div className="flex justify-end gap-4 mt-4 text-[14px]">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-200">No products added yet.</p>
        )}
      </div>
    </>
  );
}

export default AddProduct;
