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

  function handleLangChange(l: Lang) {
    setLang(l);
    const url = new URL(window.location.href);
    if (l === "tr") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", l);
    }
    window.history.replaceState({}, "", url);
  }

  return (
    <>
      <HomePage lang={lang} onLangChange={handleLangChange} />
      <WhatsAppButton lang={lang} />
    </>
  );
}
