import axios from "axios";
import { error } from "console";
import { CrossIcon } from "lucide-react";
import React, { useState, ChangeEvent, FormEvent, SetStateAction } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Cookies from "js-cookie";

interface FeedbackFormData {
  category: string;
  details: string;
}

type FeedbackCategory = "bug" | "feature" | "improvement" | "other" | "";

const FeedbackForm = ({
  setMenu,
}: {
  setMenu: (msg: number) => void;
}) => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    category: "",
    details: "",
  });

  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
    null
  );

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_FEEDBACK_API!, { ...formData, agencyId: 0}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      setStatus("success");
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
        setMenu(-1);
      }, 5000); // Hide after 5 seconds
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-lg w-[40vw] text-gray-100">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-white">Feedback Form</h2>
        <CrossIcon
          onClick={() => setMenu(-1)}
          className="rotate-45 cursor-pointer"
        />
      </div>
      {showSuccessNotification && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#1c1c1c] text-white rounded-xl p-6 w-[320px] text-center relative shadow-lg">
            <button
              onClick={() => {
                setShowSuccessNotification(false);
                setMenu(-1);
              }}
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
              Thank you for submitting your feedback.
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-zinc-700 border border-gray-600 rounded-md py-2 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="details"
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            Details
          </label>
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="w-full bg-zinc-700 border border-gray-600 rounded-md py-2 px-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
            placeholder="Please provide details about your feedback..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-zinc-600 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
