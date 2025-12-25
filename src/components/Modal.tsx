import { createPortal } from "react-dom";
import CloseBtn from "./CloseBtn";
// import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

const Modal = ({ children, className = "w-77.5", onClose }: ModalProps) => {
  // useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") onClose();
  //   };

  //   window.addEventListener("keydown", handleEscape);

  //   // Cleanup on unmount
  //   return () => window.removeEventListener("keydown", handleEscape);
  // }, [onClose]);

  return createPortal(
    <>
      {/* Backdrop ساده و تیره */}
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className={`bg-white rounded-4xl p-6 shadow-lg relative ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="absolute top-2 left-2">
            <CloseBtn onClick={onClose} />
          </div>

          {/* Content */}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
