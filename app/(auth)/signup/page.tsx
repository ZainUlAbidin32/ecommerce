"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <main className="h-screen flex flex-col w-full px-4">
      <h2>Sign Up</h2>
      <p>Hello there, sign up to continue.</p>
      <form onSubmit={handleSubmit} action="">
        <div className="relative w-80">
  {/* Floating Label */}
  <label
    htmlFor="name"
    className="absolute -top-2 left-3 bg-white px-2 text-sm text-gray-600 z-10"
  >
    Name
  </label>

  {/* Input */}
  <input
    id="name"
    type="text"
    className="w-full rounded-md border border-gray-400 py-3 pl-4 pr-12 outline-none focus:border-green-600"
  />

  {/* Icon inside input */}
  <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
</div>
      </form>
    </main>
  );
}
