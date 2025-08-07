import { CreditCard, Trash2 } from "lucide-react";
import React from "react";

interface PaymentMethodsProps {
  methods: any[];
  methodsLoading: boolean;
  methodsError: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setMethods: React.Dispatch<React.SetStateAction<any[]>>;
  toast: any;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ methods, methodsLoading, methodsError, setLoading, setError, setMethods, toast }) => {
  const handleDelete = async (method: any) => {
    try {
      setLoading(true);
      setError("");
      const token = (await import("js-cookie")).default.get('token');
      const axios = (await import("axios")).default;
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
  };

  return (
    <div className="space-y-4 w-full lg:w-2/3">
      <p className="text-zinc-400 text-sm font-medium">Primary payout method</p>
      {methodsLoading ? (
        <div className="text-zinc-400">Loading payment methods...</div>
      ) : methodsError ? (
        <div className="text-red-500">{methodsError}</div>
      ) : methods.length === 0 ? (
        <div className="text-zinc-400">No payment methods found.</div>
      ) : (
        <div className="space-y-3 h-[22rem] overflow-scroll">
          {methods.filter((m) => m.isActive === true).map((method) => (
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
              {!method.isPrimary && (
                <button
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                  aria-label="Delete payment method"
                  onClick={() => handleDelete(method)}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
