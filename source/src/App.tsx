import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import type { Lang } from "./content/types";

export default function App() {
  const [lang, setLang] = useState<Lang>("tr");

  return (
    <>
      <HomePage lang={lang} onLangChange={setLang} />
      <WhatsAppButton lang={lang} />
    </>
  );
}
