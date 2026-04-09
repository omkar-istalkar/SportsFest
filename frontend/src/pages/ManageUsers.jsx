import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { useEffect, useState } from "react";

export function ManageUsers() {
  const [allusers, setAllusers] = useState([]);

  const loggedUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/userdata/users", {
        credentials: "include",
      });
      const response = await res.json();
      setAllusers(response.data || response);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <div className="flex bg-[#0B1120] min-h-screen text-white">
      <Sidebar ROLE="ADMIN" />

      <div className="flex-1 ml-0 md:ml-[220px] p-6">
        <Header title="User Management" />

        {/* Title Section */}
        <div className="mb-6 animate-fadeIn">
          <h2 className="text-2xl font-bold tracking-wide">
            User Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Below is list of Logged-in users
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-[#111827] rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">

          {allusers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                
                {/* Header */}
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Address</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {allusers.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-[#1F2937] transition duration-200 ease-in-out"
                    >
                      <td className="py-3 px-4 font-medium text-gray-300">
                        {user.userId || index + 1}
                      </td>
                      <td className="py-3 px-4 text-white">
                        {user.name || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {user.email || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {user.phone || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-400">
                        {user.address || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p className="text-lg">🚫 No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}