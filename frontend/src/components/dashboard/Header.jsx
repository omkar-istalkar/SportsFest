import { motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, Upload, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = ({
  role = "ADMIN",
  name = "Admin",
  toggleSidebar, // ✅ NEW PROP
}) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  address: "",
  image: null,
  preview: null
});


  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true },
      );

      alert("Logout success");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed");
    }
  };

  const showUser = async () => {
    try {
      const email1 = localStorage.getItem("username");
      const email = encodeURIComponent(email1);
      const res = await fetch(
        `http://localhost:8080/api/userdata/user/${email}`,
        {},
        { Credentials: "include" },
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.log("Error while fetching userdata: ", err);
    }
  };

  if (role != "ADMIN") {
    useEffect(() => {
      showUser();
    }, []);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  // ✅ SUBMIT PROFILE
  const handleSubmit = async () => {
    try {
      const form = new FormData();

      form.append("phone", formData.phone);
      form.append("address", formData.address);
      form.append("email", localStorage.getItem("username"));

      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.post("http://localhost:8080/api/userdata/update", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      alert("Profile updated");
      setShowModal(false);
      showUser();

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="
        flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4
        mb-6 sm:mb-10
        px-2 sm:px-0 py-2
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* ✅ MOBILE HAMBURGER */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-muted/20 transition"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate">
            Welcome back 👋
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
            {role === "ADMIN"
              ? "Here's the latest overview of your events"
              : "Browse events and manage your registrations"}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-end sm:justify-normal gap-3 sm:gap-5">
        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="
              flex items-center gap-2 sm:gap-3
              px-2 py-1.5
              rounded-lg
              cursor-pointer
              hover:bg-muted/20
              transition
            "
          >
            {/* AVATAR */}
            <div className="relative group">
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">

              {userData?.image ? (
                <img
                  src={userData.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  {name.charAt(0)}
                </div>
              )}

            </div>
            </div>

            {/* NAME */}
            <span className="text-xs sm:text-sm text-muted-foreground font-medium hidden sm:block">
              {name}
            </span>

            <ChevronDown
              size={14}
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </div>

          {/* DROPDOWN */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                absolute right-0 mt-3 w-72
                backdrop-blur-xl bg-white/5
                border border-white/10
                rounded-2xl
                shadow-2xl
                p-4
                z-50
              "
            >
              {/* 🔹 USER CARD */}
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">

                  {userData?.image ? (
                    <img
                      src={userData.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      {name.charAt(0)}
                    </div>
                  )}

                </div>

                {role != "ADMIN" ? <div>
                  <p className="text-white font-semibold text-sm">
                    {userData?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userData?.email}
                  </p>
                </div> : <p>Admin</p>}
              </div>

              {/* 🔹 DIVIDER */}
              <div className="h-px bg-white/10 my-3"></div>

              {/* 🔹 INFO SECTION */}
              {role != "ADMIN"?
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-white">
                    {userData?.phone || "Not set"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="text-white text-right max-w-[140px] truncate">
                    {userData?.address || "Not set"}
                  </span>
                </div>
              </div>: "You are admin \nYou don\'t need anything"}

              {/* 🔹 ACTION BUTTONS */}
              <div className="mt-4 space-y-2">
                {role!="ADMIN"?<button
                  onClick={() => setShowModal(true)}
                  className="
          w-full flex items-center justify-center gap-2
          py-2 rounded-lg
          bg-blue-500/10 text-blue-400
          hover:bg-blue-500/20
          transition transform hover:scale-[1.02]
        "
                >
                  <Upload size={14} />
                  Update Profile
                </button>:""}

                <button
                  onClick={handleLogout}
                  className="
          w-full flex items-center justify-center gap-2
          py-2 rounded-lg
          bg-red-500/10 text-red-400
          hover:bg-red-500/20
          transition transform hover:scale-[1.02]
        "
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    

    {showModal && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#0f172a] p-6 rounded-xl w-[90%] max-w-md"
          >

            <h2 className="text-white text-lg mb-4">Update Profile</h2>

            {/* IMAGE */}
            <div className="flex flex-col items-center mb-4">

              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 mb-2">

                {formData.preview || userData?.profileImage ? (
                  <img
                    src={formData.preview || userData.profileImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    {name.charAt(0)}
                  </div>
                )}

              </div>

              <input type="file" onChange={handleImageChange} />

            </div>

            {/* INPUTS */}
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone" 
              className="w-full mb-2 p-2 bg-gray-800 text-white rounded"
            />

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full mb-3 p-2 bg-gray-800 text-white rounded"
            />

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 rounded text-white"
              >
                Save
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}
      </motion.header>
  )
};

export default Header;
