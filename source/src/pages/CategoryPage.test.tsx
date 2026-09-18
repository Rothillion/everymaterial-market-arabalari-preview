import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryPage } from "./CategoryPage";

describe("CategoryPage", () => {
  it("renders the real Metal ve Yük Taşıma Arabaları family with a real product link", () => {
    render(<CategoryPage lang="tr" familySlug="metal-yuk-tasima" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Metal ve Yük Taşıma Arabaları");
    const link = screen.getByRole("link", { name: /25 Lt Metal Çocuk Arabası/ });
    expect(link).toHaveAttribute("href", "/urun-tr.html?slug=25-lt-metal-cocuk-arabasi");
  });

  it("renders the real Plastik Alışveriş Arabaları family", () => {
    render(<CategoryPage lang="tr" familySlug="alisveris-arabalari" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Plastik Alışveriş Arabaları");
  });

  it("renders real Arabic content and flips the document to RTL", () => {
    render(<CategoryPage lang="ar" familySlug="metal-yuk-tasima" />);
    expect(document.documentElement.dir).toBe("rtl");
  });
});
