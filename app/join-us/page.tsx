import React from "react";

const page = () => {
  const inputClass =
    "bg-white/10 border border-white/30 rounded-md px-4 py-3 w-full placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141010] to-[#e34e1c] flex flex-col">
      {/* Top Section */}
      <div className="text-center text-white py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold">JOIN US</h2>
        <p className="mt-3 text-white/80 max-w-xl mx-auto">
          Share with us your details, we will get in touch with you to have you
          onboard with us!
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-gradient-to-b from-[#b83a1b] to-[#e65b2e] p-6 md:p-10 rounded-t-3xl text-white max-w-5xl mx-auto w-full">
        <h3 className="text-lg font-semibold mb-6">Reach us now!</h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Row 1 */}
          <input type="text" placeholder="Full name *" className={inputClass} />
          <select className={inputClass}>
            <option>Select country *</option>
          </select>

          {/* Row 2 */}
          <div className="flex gap-2">
            <select className={`${inputClass} w-28`}>
              <option>MY(+60)</option>
            </select>
            <input
              type="text"
              placeholder="Mobile number *"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder="Company website name"
            className={inputClass}
          />

          {/* Row 3 */}
          <div className="flex gap-2">
            <select className={`${inputClass} w-28`}>
              <option>MY(+60)</option>
            </select>
            <input
              type="text"
              placeholder="WhatsApp number *"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            placeholder="Number of hosts / creators"
            className={inputClass}
          />

          {/* Checkbox */}
          <div className="col-span-2 flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              id="sameAsMobile"
              className="accent-white w-4 h-4"
            />
            <label htmlFor="sameAsMobile" className="text-sm text-white/90">
              Same as mobile number
            </label>
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email address *"
            className={`${inputClass} col-span-2`}
          />

          {/* Submit */}
          <div className="col-span-2 flex flex-col items-center mt-4">
            <button
              type="submit"
              className="bg-white text-[#e34e1c] px-6 py-2 rounded-md font-semibold hover:bg-orange-100 transition"
            >
              Submit form
            </button>
            <p className="text-sm text-white/80 mt-2">
              We will get in touch with you soon
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
