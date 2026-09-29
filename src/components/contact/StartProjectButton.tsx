"use client";

import { useContactForm } from "./ContactFormProvider";
import { BrutalActionButton } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/Icons";

export function StartProjectButton() {
  const { open } = useContactForm();

  return (
    <BrutalActionButton type="button" onClick={open}>
      Start a project <ArrowUpRight size={16} />
    </BrutalActionButton>
  );
}
