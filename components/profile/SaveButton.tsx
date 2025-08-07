import React from "react";
import { Check } from "lucide-react";

interface SaveButtonProps {
  saving: boolean;
  disabled: boolean;
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ saving, disabled, onClick }) => (
  <div className="mt-8 flex justify-end">
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {saving ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Saving...
        </>
      ) : (
        <>
          <Check size={18} />
          Save Changes
        </>
      )}
    </button>
  </div>
);

export default SaveButton;
