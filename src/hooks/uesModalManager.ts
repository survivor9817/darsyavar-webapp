import { useState, useCallback } from "react";

// type ModalState = Record<string, boolean>;

export function useModalManager<T extends string>(modalNames: T[]) {
  // ایجاد state اولیه: همه modal‌ها false
  const initialState = modalNames.reduce((acc, name) => {
    acc[name] = false;
    return acc;
  }, {} as Record<T, boolean>);

  const [modals, setModals] = useState<Record<T, boolean>>(initialState);

  // باز کردن یک modal
  const openModal = useCallback((modalName: T) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  }, []);

  // بستن یک modal
  const closeModal = useCallback((modalName: T) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  }, []);

  // toggle یک modal
  const toggleModal = useCallback((modalName: T) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  }, []);

  // بستن همه modal‌ها (مفید برای cleanup)
  const closeAllModals = useCallback(() => {
    setModals(initialState);
  }, [initialState]);

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
  };
}
