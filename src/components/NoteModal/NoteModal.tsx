import NoteForm from "../NoteForm/NoteForm";
import css from "./NoteModal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleBackdrop(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}
