import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Invoice Header
const invoiceNumber = 'INV-2025-0001';
const invoiceDate = '24/06/2025';

// Issued By Section
const issuedByName = 'AlturaLabz';
const issuedByAddress1 = 'T4-316, Cabin No. 2, Indiabulls Mall';
const issuedByAddress2 = 'Jodhpur, Rajasthan';
const issuedByCountry = 'India';
const issuedByPhone = '+91-6367629694';

// Issued To Section
const issuedToName = 'Agency name';
const issuedToAddress = 'Agency address';
const issuedToCity = 'City, State';
const issuedToCountry = 'Country';
const issuedToPhone = '+91- phone number';

// Transaction Summary
const totalCreatorEarnings = '35340';
const commissionSlab = '12';
const totalCommissionEarned = 'xx';
const netPayout = 'xx';

// Transaction Details
const transactionId = 'TXN-0921-88921';
const payoutDate = 'March 31, 2025';
const payoutMethod = 'Direct Bank Transfer';
const status = 'Completed';

const htmlCode = `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">

<style>
    * {
      color: inherit !important;
      z-index: -9999;
    }
  </style>
  <!-- Header with Logo -->
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
    <div>
      <h1 style="font-size: 32px; font-weight: bold; margin: 0; color: #000;">PAYOUT INVOICE</h1>
      <p style="margin: 5px 0; font-size: 16px; color: #333;">Invoice Number : #${invoiceNumber}</p>
      <p style="margin: 5px 0; font-size: 16px; color: #333;">Invoice Date : ${invoiceDate}</p>
    </div>
    <div style="background-color: #000; color: white; padding: 20px 30px; text-align: center;">
      <div style="font-size: 36px; font-weight: bold; line-height: 1;">A</div>
      <div style="font-size: 18px; font-weight: bold; margin-top: -5px;">LABZ</div>
    </div>
  </div>

  <!-- Issued By and Issued To Section -->
  <div style="display: flex; justify-content: space-between; margin-bottom: 50px;">
    <div style="width: 45%;">
      <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #000;">ISSUED BY</h3>
      <p style="font-size: 16px; font-weight: bold; margin: 8px 0; color: #000;">${issuedByName}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedByAddress1}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedByAddress2}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedByCountry}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedByPhone}</p>
    </div>
    <div style="width: 45%;">
      <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #000;">ISSUED TO</h3>
      <p style="font-size: 16px; font-weight: bold; margin: 8px 0; color: #000;">${issuedToName}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedToAddress}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedToCity}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedToCountry}</p>
      <p style="font-size: 14px; margin: 4px 0; color: #333;">${issuedToPhone}</p>
    </div>
  </div>

  <!-- Transaction Summary -->
  <div style="margin-bottom: 50px;">
    <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #000;">TRANSACTION SUMMARY</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; background-color: #fff;">Total creator earnings</td>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; text-align: left; background-color: #fff;">₹${totalCreatorEarnings}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; background-color: #fff;">Commission slab</td>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; text-align: left; background-color: #fff;">${commissionSlab}%</td>
      </tr>
      <tr>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; background-color: #fff;">Total commission earned</td>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; text-align: left; background-color: #fff;">₹${totalCommissionEarned}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; background-color: #fff;">Net payout</td>
        <td style="border: 1px solid #000; padding: 12px 20px; font-size: 14px; text-align: left; background-color: #fff;">₹${netPayout}</td>
      </tr>
    </table>
  </div>

  <!-- Divider line -->
  <hr style="border: none; border-top: 1px solid #ccc; margin: 40px 0;">

  <!-- Transaction Details -->
  <div>
    <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #000;">TRANSACTION DETAILS</h3>
    <p style="font-size: 14px; margin: 12px 0; color: #333;">
      <strong>Transaction ID:</strong> ${transactionId}
    </p>
    <p style="font-size: 14px; margin: 12px 0; color: #333;">
      <strong>Payout Date:</strong> ${payoutDate}
    </p>
    <p style="font-size: 14px; margin: 12px 0; color: #333;">
      <strong>Payout Method:</strong> ${payoutMethod}
    </p>
    <p style="font-size: 14px; margin: 12px 0; color: #333;">
      <strong>Status:</strong> ${status}
    </p>
  </div>
</div>`

export const downloadPDF = async ( filename: string = 'invoice.pdf'): Promise<void> => {
  const container = document.createElement('div');
  container.innerHTML = htmlCode;
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.zIndex = '-9999';
  container.style.top = '0';
  container.style.width = '210mm';
  
  document.body.appendChild(container);
  
  try {
    const canvas = await html2canvas(container, {
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(filename);
  } finally {
    document.body.removeChild(container);
  }
};