import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../components/Sidebar'

function GetintouchEntries() {
    const [Entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null); // store Entry being edited
    const [editData, setEditData] = useState({ remark: "" });
    const [filter, setFilter] = useState("all");

    // filtering before mapping
    const filteredEntries = Entries.filter((entry) => {
        if (filter === "withRemark") return entry.remark && entry.remark.trim() !== "";
        if (filter === "withoutRemark") return !entry.remark || entry.remark.trim() === "";
        return true;
    });

    // Fetch Entries
    const fetchEntries = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/getintouch");
            setEntries(res.data);
        } catch (error) {
            console.error("Error fetching Entries", error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    // Delete Entry
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await axios.delete(`http://localhost:5000/api/getintouch/${id}`);
                fetchEntries();
            } catch (error) {
                console.error("Error deleting Entry", error);
            }
        }
    };

    // Open edit form
    const handleEditClick = (Entry) => {
        setEditingEntry(Entry._id);
        setEditData({ remark: Entry.remark || "" });
    };

    // Save edited Entry
    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/getintouch/${id}`, editData);
            setEditingEntry(null);
            fetchEntries();
        } catch (error) {
            console.error("Error updating Entry", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    return (
        <>
            <Sidebar />
            <div className="pl-5 md:pl-80 lg:pl-85 pt-24 md:pt-10 lg:pt-20 bg-gradient-to-l from-black to-[#1E1E1E] text-gray-300 min-h-screen pr-6 md:pr-8 lg:pr-16">
                <p className='text-[25px] md:text-[35px] font-bold mb-4 md:mb-8 '>Get in Touch Entries</p>

                {/* Filter Options */}
                <div className="mb-4 space-x-2 text-[13px] md:text-[16px] text-white ">
                    <button onClick={() => setFilter('all')} className="px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded cursor-pointer ">All</button>
                    <button onClick={() => setFilter('withRemark')} className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded cursor-pointer">Connected</button>
                    <button onClick={() => setFilter('withoutRemark')} className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 rounded cursor-pointer">Not Connected</button>
                </div>

                <div className=" rounded-2xl shadow-md overflow-x-auto">
                    <div className="space-y-4">
                        {filteredEntries.length > 0 ? (
                            filteredEntries.map((Entry) => (
                                <div
                                    key={Entry._id}
                                    className="bg-gradient-to-tl from-[#070707] to-[#1E1E1E] p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition-all"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-400 text-sm">Full Name</p>
                                            <p className="font-semibold">{Entry.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Company Name</p>
                                            <p className="font-semibold">{Entry.companyName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Email</p>
                                            <p className="font-semibold">{Entry.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm">Requirements</p>
                                            <p className="font-semibold">{Entry.requirement}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-gray-400 text-sm">Remark</p>
                                            {editingEntry === Entry._id ? (
                                                <textarea
                                                    value={editData.remark}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, remark: e.target.value })
                                                    }
                                                    placeholder="Add remark..."
                                                    className="border w-full p-2 rounded mt-1"
                                                />
                                            ) : (
                                                <p className="font-semibold">
                                                    {Entry.remark || (
                                                        <span className="text-gray-500">No remark</span>
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-2 mt-4">
                                        {editingEntry === Entry._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleSaveEdit(Entry._id)}
                                                    className="bg-green-800 hover:bg-green-700 text-white px-3 py-1 rounded"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingEntry(null)}
                                                    className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEditClick(Entry)}
                                                    className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded text-[14px] md:text-[16px]"
                                                >
                                                    Edit Remark
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(Entry._id)}
                                                    className="bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded text-[14px] md:text-[16px]"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-6">No messages yet.</p>
                        )}
                    </div>

                </div>
            </div>

        </>
    );

}

export default GetintouchEntries
