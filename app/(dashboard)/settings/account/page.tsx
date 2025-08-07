'use client'
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";
import UpiModal from "@/components/account/UpiModal";
import BankModal from "@/components/account/BankModal";
import PaymentMethods from "@/components/account/PaymentMethods";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useProfileUrlStore } from "@/zustand/stores/useProfileUrlStore";


const initialFormState = {
  upi: " ",
  type: " ",
  accountHolderName: "",
  accountNumber: " ",
  bankName: " ",
  ifscCode: " ",
  bankLogo: " ",
  isPrimary: false,
  agencyId: Number(Cookies.get('agencyId')),
  pioneerId: " ",
  paypalId: " "
};

const AccountPage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [methods, setMethods] = useState<any[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsError, setMethodsError] = useState("");
  const { name } = useProfileUrlStore();

  // Fetch all payment methods on mount
  React.useEffect(() => {
    const fetchMethods = async () => {
      setMethodsLoading(true);
      setMethodsError("");
      try {
        const token = Cookies.get('token');
        const res = await axios.get(process.env.NEXT_PUBLIC_WITHDRAWAL_LIST_API!, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMethods(res.data);
      } catch (err: any) {
        setMethodsError('Failed to load payment methods.');
      } finally {
        setMethodsLoading(false);
      }
    };
    fetchMethods();
  }, []);
  const handleChangePassword = async (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_CHANGE_PASSWORD_API!, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      });

      toast.success("Successfully changed the password");
    } 
    catch {
      toast.error("Failed to change the password");
    } 
    finally {
      setShowChangePassword(false);
    }
  };




  return (
    <div className="w-full min-h-screen bg-black text-white p-4 md:p-6 lg:p-8 overflow-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Account</h1>

      <div className="w-full mb-6 rounded-xl bg-[#1E1E1E] shadow-lg overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Login & Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-2">
              <p className="text-zinc-400 text-sm">Username</p>
              <p className="font-medium">{name}</p>
            </div>

            <div className="space-y-2">
              <p className="text-zinc-400 text-sm">Password</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="font-mono">••••••••••••</p>
                <button
                  className="text-blue-500 text-sm hover:text-blue-400 transition-colors"
                  onClick={() => setShowChangePassword(true)}
                >
                  Reset Password
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-zinc-400 text-sm">Account Verification</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 font-medium">Verified</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSubmit={handleChangePassword}
      />
      <UpiModal
        isOpen={showUpiModal}
        formData={formData}
        setFormData={setFormData}
        setMethods={setMethods}
        setError={setError}
        onClose={() => setShowUpiModal(false)}
        initialFormState={initialFormState}
      />

      <BankModal
        isOpen={showBankModal}
        formData={formData}
        setFormData={setFormData}
        setMethods={setMethods}
        setError={setError}
        onClose={() => setShowBankModal(false)}
        initialFormState={initialFormState}
      />
      <div className="w-full mb-6 rounded-xl bg-[#1E1E1E] shadow-lg overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Payment Methods
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <PaymentMethods
              methods={methods}
              methodsLoading={methodsLoading}
              methodsError={methodsError}
              setLoading={setLoading}
              setError={setError}
              setMethods={setMethods}
              toast={toast}
            />

            <div className="space-y-3 w-full lg:w-1/3 lg:pl-6 lg:border-l lg:border-zinc-700">
              <p className="text-zinc-400 text-sm font-medium mb-2">
                Additional options
              </p>

              <button
                className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                onClick={() => setShowUpiModal(true)}
              >
                <span>Add UPI</span>
                <ChevronRight size={16} />
              </button>

              <button
                className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                onClick={() => setShowBankModal(true)}
              >
                <span>Add another bank account</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
