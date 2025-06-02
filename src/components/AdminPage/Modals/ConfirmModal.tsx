import React from "react";
import ReactDOM from "react-dom";

interface ModalButton {
  label: string;
  onClick: () => void;
  className?: string;
}

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message: string;
  buttons?: ModalButton[]; // Optional, for dynamic usage
  onConfirm?: () => void; // For legacy usage (delete)
  onCancel?: () => void; // For legacy usage (delete)
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Bekräfta",
  message,
  buttons,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  // If buttons are provided, use them; otherwise, use legacy confirm/cancel
  const renderButtons = () => {
    if (buttons && buttons.length > 0) {
      return buttons.map((btn, idx) => (
        <button
          key={idx}
          className={
            btn.className || "px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          }
          onClick={btn.onClick}
        >
          {btn.label}
        </button>
      ));
    }
    // Default: confirm/cancel for delete
    return (
      <>
        <button
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onCancel}
        >
          Avbryt
        </button>
        <button
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          onClick={onConfirm}
        >
          Ta bort
        </button>
      </>
    );
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">{renderButtons()}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ConfirmModal;
