import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { WhatsAppButton } from "./ui/WhatsAppButton";
import { LANGS, type Lang } from "./content/types";

function initialLang(): Lang {
  const requested = new URLSearchParams(window.location.search).get("lang");
  return (LANGS as string[]).includes(requested ?? "") ? (requested as Lang) : "tr";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);

  return (
    <>
      <HomePage lang={lang} onLangChange={setLang} />
      <WhatsAppButton lang={lang} />
    </>
  );
}
