"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "../styles/slidingmenu.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import adminimg from "../img/admin.png";
import customerimg from "../img/customer.png";

export default function SlidingMenu({ isOpen, onClose }) {
  const [activeForm, setActiveForm] = useState("none"); // 'none', 'adminLogin', 'customerOptions', 'customerLogin', or 'customerSignup'

  const handleBack = () => {
    switch (activeForm) {
      case "adminLogin":
        setActiveForm("none");
        break;
      case "customerLogin":
      case "customerSignup":
        setActiveForm("customerOptions");
        break;
      case "customerOptions":
        setActiveForm("none");
        break;
      default:
        setActiveForm("none");
    }
  };

  return (
    <div
      className={`Sliding-Menu fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Log in</h2>
        <button onClick={onClose} className="text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4">
        {activeForm !== "none" && (
          <button
            className="text-sm text-gray-300 mb-4 underline"
            onClick={handleBack}
          >
            ← Go Back
          </button>
        )}

        {activeForm === "none" && (
          <div className="login-options">
            <button
              className=" admin-button option-btns w-full py-2 text-white bg-gray-900 hover:bg-gray-800 "
              onClick={() => setActiveForm("adminLogin")}
            >
              <span>
                <img src={adminimg} alt="admin icon" />
              </span>
              Admin
            </button>
            <button
              className=" option-btns w-full py-2 text-white bg-gray-900 hover:bg-gray-800"
              onClick={() => setActiveForm("customerOptions")}
            >
              <span>
                <img src={customerimg} alt="customers icon" />
              </span>
              Customer
            </button>
          </div>
        )}

        {activeForm === "customerOptions" && (
          <div className="customer-options">
            <button
              className="w-full py-2 text-white bg-gray-900 hover:bg-gray-800 mb-2"
              onClick={() => setActiveForm("customerLogin")}
            >
              Log In
            </button>
            <button
              className="w-full py-2 text-white bg-gray-900 hover:bg-gray-800"
              onClick={() => setActiveForm("customerSignup")}
            >
              Sign Up
            </button>
          </div>
        )}

        {activeForm === "adminLogin" && <LoginForm role="Admin" />}
        {activeForm === "customerLogin" && <LoginForm role="Customer" />}
        {activeForm === "customerSignup" && <SignUpForm />}
      </div>
    </div>
  );
}
