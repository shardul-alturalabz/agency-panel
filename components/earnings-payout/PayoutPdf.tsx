import React, { forwardRef } from 'react';

const PayoutInvoice = forwardRef((props, ref: any) => {
  // Calculate commission and net payout
  const creatorEarnings = 35340;
  const commissionRate = 12;
  const commissionEarned = (creatorEarnings * commissionRate) / 100;
  const netPayout = creatorEarnings - commissionEarned;

  return (
    <div 
      ref={ref}
      data-invoice="true"
      className="max-w-4xl mx-auto p-8"
      style={{ 
        position: 'absolute', 
        left: '-9999px',
        top: '0',
        width: '210mm', // A4 width
        backgroundColor: '#ffffff',
        color: '#000000'
      }}
    >
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">PAYOUT INVOICE</h1>
          <p style={{ color: '#374151' }}>
            <span className="font-semibold">Invoice Number:</span> #INV-2025-0001
          </p>
          <p style={{ color: '#374151' }}>
            <span className="font-semibold">Invoice Date:</span> 24/06/2025
          </p>
        </div>
        <div className="px-6 py-4 rounded" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
          <div className="text-2xl font-bold">A</div>
          <div className="text-sm">LABZ</div>
        </div>
      </div>

      {/* Divider */}
      <hr className="mb-8" style={{ borderColor: '#e5e7eb' }} />

      {/* Issued By and Issued To Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-4">ISSUED BY</h2>
          <p className="font-semibold">AlturaLabz</p>
          <p style={{ color: '#374151' }}>T4-316, Cabin No. 2, Indiabulls Mall</p>
          <p style={{ color: '#374151' }}>Jodhpur, Rajasthan</p>
          <p style={{ color: '#374151' }}>India</p>
          <p style={{ color: '#374151' }}>+91-6367629694</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">ISSUED TO</h2>
          <p className="font-semibold">Creative Studios Agency</p>
          <p style={{ color: '#374151' }}>B-204, Silver Tower, MG Road</p>
          <p style={{ color: '#374151' }}>Mumbai, Maharashtra</p>
          <p style={{ color: '#374151' }}>India</p>
          <p style={{ color: '#374151' }}>+91-9876543210</p>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">TRANSACTION SUMMARY</h2>
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
          <table className="w-full">
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="px-6 py-4 font-medium">Total creator earnings</td>
                <td className="px-6 py-4 text-right">₹{creatorEarnings.toLocaleString()}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                <td className="px-6 py-4 font-medium">Commission slab</td>
                <td className="px-6 py-4 text-right">{commissionRate}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="px-6 py-4 font-medium">Total commission earned</td>
                <td className="px-6 py-4 text-right">₹{commissionEarned.toLocaleString()}</td>
              </tr>
              <tr style={{ backgroundColor: '#f3f4f6' }} className="font-bold">
                <td className="px-6 py-4">Net payout</td>
                <td className="px-6 py-4 text-right text-lg">₹{netPayout.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Divider */}
      <hr className="mb-8" style={{ borderColor: '#e5e7eb' }} />

      {/* Transaction Details */}
      <div>
        <h2 className="text-xl font-bold mb-4">TRANSACTION DETAILS</h2>
        <div className="space-y-2">
          <p style={{ color: '#374151' }}>
            <span className="font-semibold">Transaction ID:</span> TXN-0921-88921
          </p>
          <p style={{ color: '#374151' }}>
            <span className="font-semibold">Payout Date:</span> March 31, 2025
          </p>
          <p style={{ color: '#374151' }}>
            <span className="font-semibold">Payout Method:</span> Direct Bank Transfer
          </p>
          <p style={{ color: '#374151' }}>
            <span className="font-semibold">Status:</span>{' '}
            <span className="inline-block px-3 py-1 rounded-full text-sm" 
                  style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>
              Completed
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 text-center text-sm" style={{ borderTop: '1px solid #e5e7eb', color: '#6b7280' }}>
        <p>This is a system generated invoice and does not require signature.</p>
        <p>For any queries, please contact support@alturalabz.com</p>
      </div>
    </div>
  );
});

PayoutInvoice.displayName = 'PayoutInvoice';

export default PayoutInvoice;
