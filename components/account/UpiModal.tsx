import { X } from "lucide-react";
import React from "react";

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

interface UpiModalProps {
  isOpen: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setMethods: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  initialFormState: any;
}


const UpiModal: React.FC<UpiModalProps> = ({ isOpen, formData, setFormData, setMethods, setError, onClose, initialFormState }) => {
  const [loading, setLoading] = React.useState(false);

  const handleUpiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const upiForm = {
      ...initialFormState,
      upi: formData.upi,
      type: "upi",
      accountHolderName: formData.accountHolderName,
      isPrimary: formData.isPrimary,
    };
    try {
      const token = Cookies.get('token');
      await axios.post(process.env.NEXT_PUBLIC_WITHDRAWAL_METHOD_API!, upiForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onClose();
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

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#18181b] rounded-xl p-6 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-zinc-400 hover:text-red-500" onClick={onClose}>
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
              onChange={e => setFormData((f: any) => ({ ...f, accountHolderName: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">UPI ID</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              value={formData.upi}
              onChange={e => setFormData((f: any) => ({ ...f, upi: e.target.value }))}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="upi-is-primary"
              checked={formData.isPrimary}
              onChange={e => setFormData((f: any) => ({ ...f, isPrimary: e.target.checked }))}
              className="accent-blue-600"
            />
            <label htmlFor="upi-is-primary" className="text-sm">Set as Primary</label>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium flex items-center justify-center" disabled={loading}>
            {loading ? <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : null}
            {loading ? 'Adding...' : 'Add UPI'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpiModal;
