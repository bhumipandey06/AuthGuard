import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
        setDropdownOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
        setDropdownOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0"
    >
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      {userData ? (
        <div
          ref={dropdownRef}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative cursor-pointer select-none"
          title="User menu"
        >
          {userData.name[0].toUpperCase()}
          {dropdownOpen && (
            <div
              className="absolute top-10 right-0 z-10 bg-gray-100 rounded shadow-md"
              style={{ minWidth: "140px" }}
            >
              <ul className="list-none m-0 p-2 text-sm text-black">
                {!userData.isAccounteVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-3 hover:bg-gray-200 cursor-pointer select-none"
                  >
                    Verify email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-1 px-3 hover:bg-gray-200 cursor-pointer select-none"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="Arrow icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
