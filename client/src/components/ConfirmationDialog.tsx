import React from "react";
interface ConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center z-50 justify-center">
      <div className="bg-white rounded w-full mx-3 max-w-[280px] p-4 shadow-lg">
        <h3 className="text-lg font-heading mb-2">Unsaved Changes</h3>
        <p className="text-gray-600 text-sm mb-4">
          You have unsaved changes. Would you like to save them before closing?
        </p>
        <div className="flex justify-end w-full h-auto gap-2">
          <button
            onClick={onCancel}
            className="w-1/2 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50"
          >
            Discard
          </button>
          <button
            onClick={onConfirm}
            className="w-1/2 py-1.5 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
