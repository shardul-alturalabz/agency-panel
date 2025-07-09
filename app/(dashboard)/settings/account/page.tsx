'use client'
import { Trash2, ChevronRight, CreditCard, X } from "lucide-react";
import React, { useState } from "react";
import ChangePasswordModal from "@/components/settings/ChangePasswordModal";
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


  const handleUpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const upiForm = {
      ...initialFormState,
      upi: formData.upi,
      type: "upi",
      accountHolderName: formData.accountHolderName,
    };
    try {
      const token = Cookies.get('token');
      await axios.post(process.env.NEXT_PUBLIC_WITHDRAWAL_METHOD_API!, upiForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowUpiModal(false);
      setFormData(initialFormState);
      // Refresh methods after adding
      const res = await axios.get(process.env.NEXT_PUBLIC_WITHDRAWAL_LIST_API!, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMethods(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data?.message || 'Server error occurred.');
        } else if (err.request) {
          setError('No response from server. Please check your connection.');
        } else {
          setError('Request error: ' + err.message);
        }
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleBankSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const bankForm = {
      ...initialFormState,
      type: "bank",
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      ifscCode: formData.ifscCode,
    };
    try {
      const token = Cookies.get('token');
      await axios.post(process.env.NEXT_PUBLIC_WITHDRAWAL_METHOD_API!, bankForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowBankModal(false);
      setFormData(initialFormState);
      // Refresh methods after adding
      const res = await axios.get(process.env.NEXT_PUBLIC_WITHDRAWAL_LIST_API!, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMethods(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(err.response.data?.message || 'Server error occurred.');
        } else if (err.request) {
          setError('No response from server. Please check your connection.');
        } else {
          setError('Request error: ' + err.message);
        }
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setLoading(false);
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

      {/* ...existing code for Payment Methods... */}
      {/* UPI Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-xl p-6 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-zinc-400 hover:text-red-500" onClick={() => setShowUpiModal(false)}>
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Add UPI</h3>
            <form onSubmit={handleUpiSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Account Holder Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={formData.accountHolderName}
                  onChange={e => setFormData(f => ({ ...f, accountHolderName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">UPI ID</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={formData.upi}
                  onChange={e => setFormData(f => ({ ...f, upi: e.target.value }))}
                  required
                />
              </div>
              {/* Error is now only shown as toast, not in modal */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium flex items-center justify-center" disabled={loading}>
                {loading ? <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : null}
                {loading ? 'Adding...' : 'Add UPI'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-xl p-6 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-zinc-400 hover:text-red-500" onClick={() => setShowBankModal(false)}>
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Add Bank Account</h3>
            <form onSubmit={handleBankSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Account Holder Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={formData.accountHolderName}
                  onChange={e => setFormData(f => ({ ...f, accountHolderName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Account Number</label>
                <input
                  type="number"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={formData.accountNumber === " " ? '' : formData.accountNumber}
                  onChange={e => setFormData(f => ({ ...f, accountNumber: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Bank Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={formData.bankName}
                  onChange={e => setFormData(f => ({ ...f, bankName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">IFSC Code</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                  value={formData.ifscCode}
                  onChange={e => setFormData(f => ({ ...f, ifscCode: e.target.value }))}
                  required
                />
              </div>
              {/* Error is now only shown as toast, not in modal */}
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium flex items-center justify-center" disabled={loading}>
                {loading ? <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : null}
                {loading ? 'Adding...' : 'Add Bank Account'}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="w-full mb-6 rounded-xl bg-[#1E1E1E] shadow-lg overflow-hidden">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-semibold">
              Payment Methods
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-4 w-full lg:w-2/3">
              <p className="text-zinc-400 text-sm font-medium">
                Primary payout method
              </p>
              {methodsLoading ? (
                <div className="text-zinc-400">Loading payment methods...</div>
              ) : methodsError ? (
                <div className="text-red-500">{methodsError}</div>
              ) : methods.length === 0 ? (
                <div className="text-zinc-400">No payment methods found.</div>
              ) : (
                <div className="space-y-3 h-[22rem] overflow-scroll">
                  {methods.filter((m)=>m.isActive==true).map((method) => (
                    <div key={method.id} className="flex items-center gap-4 p-3 bg-zinc-800 rounded-lg">
                      <div className="border border-zinc-600 rounded-lg w-10 h-10 flex items-center justify-center">
                        <CreditCard size={20} className="text-zinc-300" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium">{method.accountHolderName || 'Account holder name'}</p>
                        <p className="text-zinc-400 text-sm">
                          {method.accountNumber && method.accountNumber !== "0" ? (
                            <>
                              <span className="font-mono">••••</span>
                              <span className="font-mono">••••</span> {String(method.accountNumber).slice(-4)}
                            </>
                          ) : method.bankName && method.bankName.trim() !== "" ? (
                            <>{method.bankName}</>
                          ) : (
                            <span className="font-mono">UPI: {method.upi}</span>
                          )}
                        </p>
                        {method.ifscCode && method.ifscCode.trim() !== "" && method.ifscCode !== " " && (
                          <p className="text-zinc-500 text-xs">IFSC: {method.ifscCode}</p>
                        )}
                      </div>
                      {!method.isPrimary && <button
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                        aria-label="Delete payment method"
                        onClick={async () => {
                          try {
                            setLoading(true);
                            setError("");
                            const token = Cookies.get('token');
                            await axios.put(process.env.NEXT_PUBLIC_WITHDRAWAL_METHOD_STATUS_API!, {
                              isActive: false,
                              withdrawalMethodId: method.id
                            }, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            });

                            const res = await axios.get(process.env.NEXT_PUBLIC_WITHDRAWAL_LIST_API!, {
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            setMethods(res.data);
                            toast.success('Payment method deleted');
                          } catch (err: any) {
                            setError('Failed to delete payment method.');
                            toast.error('Failed to delete payment method.');
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </button>}
                    </div>
                  ))}
                </div>
              )}
            </div>

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
