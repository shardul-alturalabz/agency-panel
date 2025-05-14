"use client";
import React, { useState } from "react";
import axios from "axios";
import countries from "../../../data/countries.json";
import { FaTimes, FaCheckCircle } from "react-icons/fa"; // Importing the cross and check icons
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const JoinUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    mobileCode: "",
    mobileNumber: "",
    companyWebsite: "",
    whatsappCode: "",
    whatsappNumber: "",
    sameAsMobile: false,
    hostCount: "",
    email: "",
  });
  const token = Cookies.get("token");
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
    null
  );

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const inputClass =
    "bg-white/10 border border-white/30 rounded-md px-4 py-3 w-full placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "country") {
      const selected = countries.find((c) => c.name === value);
      setFormData((prev) => ({
        ...prev,
        country: value,
        mobileCode: selected?.code || "",
        whatsappCode: selected?.code || "",
        whatsappNumber: prev.sameAsMobile
          ? prev.mobileNumber
          : prev.whatsappNumber,
      }));
      return;
    }

    if (name === "sameAsMobile") {
      setFormData((prev) => ({
        ...prev,
        sameAsMobile: checked,
        whatsappNumber: checked ? prev.mobileNumber : prev.whatsappNumber,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "mobileNumber" && prev.sameAsMobile
        ? { whatsappNumber: value }
        : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const payload = {
      fullName: formData.fullName.trim(),
      country: formData.country,
      mobileCode: formData.mobileCode,
      mobileNumber: formData.mobileNumber,
      phone: `${formData.mobileCode}${formData.mobileNumber}`,
      companyWebsite: formData.companyWebsite.trim(),
      websiteName: formData.companyWebsite.trim(),
      whatsappCode: formData.whatsappCode,
      whatsappNumber: formData.whatsappNumber.trim(),
      whatsapp: `${formData.whatsappCode}${formData.whatsappNumber}`,
      sameAsMobile: formData.sameAsMobile,
      hostCount: formData.hostCount.trim(),
      email: formData.email.trim(),
    };

    try {
      await axios.post(process.env.NEXT_PUBLIC_FORM_API as string, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        fullName: "",
        country: "",
        mobileCode: "",
        mobileNumber: "",
        companyWebsite: "",
        whatsappCode: "",
        whatsappNumber: "",
        sameAsMobile: false,
        hostCount: "",
        email: "",
      });
      setStatus("success");
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 5000); // Hide after 5 seconds
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141010] to-[#e34e1c] flex flex-col">
      <div className="text-center text-white py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold">JOIN US</h2>
        <p className="mt-3 text-white/80 max-w-xl mx-auto">
          Share with us your details, we will get in touch with you to have you
          onboard with us!
        </p>
      </div>

      <div className="bg-gradient-to-b from-[#b83a1b] to-[#e65b2e] p-6 md:p-10 rounded-t-3xl text-white max-w-5xl mx-auto w-full">
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => router.back()}
            className="bg-white text-[#e34e1c] px-6 py-2 rounded-md font-semibold hover:bg-orange-100 transition"
          >
            ← Back
          </Button>
        </div>
        <h3 className="text-lg font-semibold mb-6">Reach us now!</h3>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name *"
            className={inputClass}
            required
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClass}
            required
          >
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="text"
              name="mobileCode"
              value={formData.mobileCode}
              readOnly
              className={`${inputClass} w-28 bg-white/20 cursor-not-allowed`}
            />
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile number *"
              className={inputClass}
              required
            />
          </div>
          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="Company website name"
            className={inputClass}
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="whatsappCode"
              value={formData.whatsappCode}
              readOnly
              className={`${inputClass} w-28 bg-white/20 cursor-not-allowed`}
            />
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="WhatsApp number *"
              className={inputClass}
              required
            />
          </div>
          <input
            type="text"
            name="hostCount"
            value={formData.hostCount}
            onChange={handleChange}
            placeholder="Number of hosts / creators"
            className={inputClass}
          />

          <div className="col-span-2 flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="sameAsMobile"
              name="sameAsMobile"
              checked={formData.sameAsMobile}
              onChange={handleChange}
              className="accent-white w-4 h-4"
            />
            <label htmlFor="sameAsMobile" className="text-sm text-white/90">
              Same as mobile number
            </label>
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address *"
            className={`${inputClass} col-span-2`}
            required
          />

          <div className="col-span-2 flex flex-col items-center mt-4">
            <button
              type="submit"
              className="bg-white text-[#e34e1c] px-6 py-2 rounded-md font-semibold hover:bg-orange-100 transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit form"}
            </button>
          </div>
        </form>

        {/* Success Notification */}
        {showSuccessNotification && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-[#1c1c1c] text-white rounded-xl p-6 w-[320px] text-center relative shadow-lg">
              <button
                onClick={() => setShowSuccessNotification(false)}
                className="absolute top-2 right-2 text-white text-sm"
              >
                ❌
              </button>
              <div className="flex justify-center mb-4">
                <div className="bg-green-500 rounded-full p-3">
                  <FaCheckCircle className="text-white text-3xl" />
                </div>
              </div>
              <p className="font-semibold text-sm">
                Thank you for submitting your details.
              </p>
              <p className="text-sm mt-1">Our team will contact you soon.</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="text-sm text-red-200 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default JoinUs;
