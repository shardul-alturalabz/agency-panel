import React from "react";
import { Copy } from "lucide-react";

interface AgencyCodeProps {
  code: string;
  copySuccess: boolean;
  setCopySuccess: (val: boolean) => void;
}

const AgencyCode: React.FC<AgencyCodeProps> = ({ code, copySuccess, setCopySuccess }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };
  return (
    <div className="flex items-center gap-2">
      <p>{code || "N/A"}</p>
      <button
        className="text-gray-400 hover:text-white"
        onClick={() => handleCopy(code || "")}
        aria-label="Copy agency code"
      >
        <Copy size={16} />
      </button>
      {copySuccess && (
        <span className="ml-2 text-green-400 text-sm select-none">Copied!</span>
      )}
    </div>
  );
};

export default AgencyCode;
