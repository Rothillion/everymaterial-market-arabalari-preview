import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders the header, hero, and footer together for Turkish", () => {
    render(<HomePage lang="tr" onLangChange={() => {}} />);
    expect(screen.getByText("Ana Sayfa")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("EveryMaterial");
    expect(screen.getByText(/Tüm Hakları Saklıdır/)).toBeInTheDocument();
  });

  it("renders real Arabic content and flips the document to RTL (Faz 2)", () => {
    render(<HomePage lang="ar" onLangChange={() => {}} />);
    expect(screen.getByText("الرئيسية")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("بليكسي");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
