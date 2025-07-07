import { SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { Check, ChevronDown, X } from "lucide-react";

export default function PayoutRequestModal({ set }: { set: React.Dispatch<SetStateAction<boolean>> }) {
    const [withdrawAll, setWithdrawAll] = useState(true);
    const [payoutAmount, setPayoutAmount] = useState('6,00,000');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(0);
    const [response, setResponse] = useState(false);
    const [payoutMethods, setPayoutMethods] = useState<any[]>([]);
    const [availableBalance, setAvailableBalance] = useState('6,00,000');
    const [loading, setLoading] = useState(false); // Loading for payout methods
    const [requesting, setRequesting] = useState(false); // Loading for payout request

    useEffect(() => {
        const fetchMethods = async () => {
            setLoading(true);
            try {
                const token = Cookies.get('token');
                const agencyId = Cookies.get('agencyId');
                const url = `${process.env.NEXT_PUBLIC_WITHDRAWAL_LIST_API!}?agencyId=${agencyId}`;
                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPayoutMethods(res.data || []);
                // Optionally, fetch available balance from API if needed
                // setAvailableBalance(...)
            } catch (err: any) {
                let message = 'Failed to fetch payout methods';
                if (err.response) {
                    message = err.response.data?.message || err.response.data?.error || message;
                } else if (err.request) {
                    message = 'No response from server. Please check your connection.';
                } else if (err.message) {
                    message = err.message;
                }
                toast.error(message);
            } finally {
                setLoading(false);
            }
        };
        fetchMethods();
    }, []);

    const handleWithdrawAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setWithdrawAll(checked);
        if (checked) {
            setPayoutAmount(availableBalance);
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[₹,]/g, '');
        setPayoutAmount(value);
        if (value !== availableBalance.replace(/,/g, '')) {
            setWithdrawAll(false);
        }
        // Show toast if payout amount exceeds available balance
        const numericValue = parseFloat(value.replace(/,/g, ''));
        const numericBalance = parseFloat(availableBalance.replace(/,/g, ''));
        if (!isNaN(numericValue) && numericValue > numericBalance) {
            toast.error("Payout amount cannot exceed available balance");
        }
    };

    const handleMethodSelect = (index: number) => {
        setSelectedMethod(index);
        setShowDropdown(false);
    };

    const formatAmount = (amount: string) => {
        return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const numericPayoutAmount = parseFloat(payoutAmount.replace(/,/g, ''));
    const numericAvailableBalance = parseFloat(availableBalance.replace(/,/g, ''));
    const isAmountInvalid = isNaN(numericPayoutAmount) || numericPayoutAmount > numericAvailableBalance || numericPayoutAmount <= 0;

    return (
        <div className="fixed inset-0 bg-black/90 bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] rounded-2xl w-full max-w-2xl p-6 relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-white text-2xl font-semibold">Request Payout</h2>
                    <button onClick={() => set(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Loading State for payout methods */}
                {loading ? (
                    <div className="h-[20rem] flex items-center justify-center w-full">
                        <div className="flex flex-col items-center gap-4">
                            <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            <span className="text-white text-lg">Loading payout methods...</span>
                        </div>
                    </div>
                ) : response ? (
                    <div className='h-[20rem] pb-14 text-2xl w-full flex items-center justify-center'>
                        Your request has been submitted successfully!
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center mb-6">
                            <label className="text-white text-lg w-48 flex-shrink-0">Available balance</label>
                            <div className="bg-zinc-700 rounded-lg px-4 py-4 flex-1">
                                <span className="text-white text-lg">₹{availableBalance}</span>
                            </div>
                        </div>

                        {/* Payout Amount - Horizontal */}
                        <div className="flex items-center mb-6">
                            <label className="text-white text-lg w-48 flex-shrink-0">Payout amount</label>
                            <div className="bg-zinc-700 rounded-lg px-4 py-4 flex-1">
                                <input
                                    type="text"
                                    value={`₹${formatAmount(payoutAmount)}`}
                                    onChange={handleAmountChange}
                                    className="bg-transparent text-white text-lg w-full outline-none"
                                    placeholder="Enter amount"
                                    disabled={requesting}
                                />
                            </div>
                        </div>

                        {/* Withdraw All Checkbox - Horizontal */}
                        <div className="flex items-center mb-8">
                            <div className="w-48 flex-shrink-0"></div>
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={withdrawAll}
                                        onChange={handleWithdrawAllChange}
                                        className="sr-only"
                                        disabled={requesting}
                                    />
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${withdrawAll
                                        ? 'bg-orange-500 border-orange-500'
                                        : 'border-zinc-500 bg-transparent'
                                        }`}>
                                        {withdrawAll && <Check size={12} className="text-white" />}
                                    </div>
                                </div>
                                <span className="text-white text-lg ml-3">Withdraw all</span>
                            </label>
                        </div>

                        {/* Payout Method - Horizontal with Dropdown */}
                        <div className="flex items-start mb-8">
                            <label className="text-white text-lg w-48 flex-shrink-0 pt-4">Payout method</label>
                            <div className="flex-1 relative">
                                <div
                                    className={`bg-zinc-700 rounded-lg px-4 py-4 cursor-pointer ${requesting ? 'opacity-60 pointer-events-none' : ''}`}
                                    onClick={() => !requesting && setShowDropdown(!showDropdown)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {payoutMethods.length > 0 && (
                                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                                                    {payoutMethods[selectedMethod].bankLogo && (
                                                        <img src={payoutMethods[selectedMethod].bankLogo} alt="logo" className="w-8 h-8 object-contain" />
                                                    )}
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-white text-lg font-medium">{payoutMethods[selectedMethod]?.bankName || payoutMethods[selectedMethod]?.accountHolderName || '—'}</div>
                                                <div className="text-zinc-400 text-sm">{payoutMethods[selectedMethod]?.accountNumber || payoutMethods[selectedMethod]?.upi || '—'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                                <Check size={14} className="text-white" />
                                            </div>
                                            <ChevronDown size={20} className={`text-zinc-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                        {payoutMethods.map((method, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-3 hover:bg-zinc-600 cursor-pointer border-b border-zinc-600 last:border-b-0"
                                                onClick={() => handleMethodSelect(index)}
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                                                        {method.bankLogo && (
                                                            <img src={method.bankLogo} alt="logo" className="w-8 h-8 object-contain" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-white text-base font-medium">{method.bankName || method.accountHolderName || '—'}</div>
                                                        <div className="text-zinc-400 text-sm">{method.accountNumber || method.upi || '—'}</div>
                                                        <div className="text-zinc-500 text-xs">{method.type}</div>
                                                    </div>
                                                    {index === selectedMethod && (
                                                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                            <Check size={12} className="text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Request Payout Button */}
                        <button
                            className={`w-full bg-orange-600 hover:bg-orange-700 cursor-pointer text-white text-lg font-semibold py-4 rounded-xl transition-colors ${isAmountInvalid ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isAmountInvalid || payoutMethods.length === 0 || requesting}
                            onClick={async () => {
                                setRequesting(true);
                                try {
                                    const token = Cookies.get('token');
                                    const payload = {
                                        requestedAmount: numericPayoutAmount,
                                        withdrawalMethodId: payoutMethods[selectedMethod]?.id
                                    };
                                    await axios.post(process.env.NEXT_PUBLIC_WITHDRAWAL_REQUEST_API!, payload, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    });
                                    setResponse(true);
                                } catch (err: any) {
                                    let message = 'Failed to request payout';
                                    if (err.response) {
                                        message = err.response.data?.message || err.response.data?.error || message;
                                    } else if (err.request) {
                                        message = 'No response from server. Please check your connection.';
                                    } else if (err.message) {
                                        message = err.message;
                                    }
                                    toast.error(message);
                                } finally {
                                    setRequesting(false);
                                }
                            }}
                        >
                            {requesting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    Requesting...
                                </span>
                            ) : (
                                'Request Payout'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}