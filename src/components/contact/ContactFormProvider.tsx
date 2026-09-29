"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLenis } from "lenis/react";
import { ContactDialog } from "./ContactDialog";

const ContactFormContext = createContext<{ open: () => void }>({
  // Without a provider, fall back to the contact section itself.
  open: () => {
    window.location.hash = "contact";
  },
});

export const useContactForm = () => useContext(ContactFormContext);

/**
 * Owns the "Start a project" dialog. Anything inside can open it through
 * useContactForm(); while it is open the rest of the page is inert.
 */
export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const trigger = useRef<Element | null>(null);

  const show = useCallback(() => {
    trigger.current = document.activeElement;
    setOpen(true);
  }, []);
  const hide = useCallback(() => setOpen(false), []);

  // Freeze the page behind the dialog and hand focus back when it closes.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (trigger.current instanceof HTMLElement) trigger.current.focus();
    };
  }, [open, lenis]);

  // A stable value, so consumers don't re-render every time the dialog toggles.
  const value = useMemo(() => ({ open: show }), [show]);

  return (
    <ContactFormContext.Provider value={value}>
      <div inert={open}>{children}</div>
      <ContactDialog open={open} onClose={hide} />
    </ContactFormContext.Provider>
  );
}
