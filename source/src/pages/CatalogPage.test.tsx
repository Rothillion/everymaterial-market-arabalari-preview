import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CatalogPage } from "./CatalogPage";

describe("CatalogPage", () => {
  it("renders the real Turkish catalog with the first family's real products", () => {
    render(<CatalogPage lang="tr" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Ürün Kataloğu");
    expect(screen.getAllByText("25 Lt Bayraklı Çocuk Alışveriş Arabası").length).toBeGreaterThan(0);
  });

  it("switches to the real 'Metal ve Yük Taşıma Arabaları' family on tab click", () => {
    render(<CatalogPage lang="tr" />);
    fireEvent.click(screen.getByRole("tab", { name: "Metal ve Yük Taşıma Arabaları" }));
    // Appears twice: once in the product card grid, once in the comparison table row.
    expect(screen.getAllByText("25 Lt Metal Çocuk Arabası").length).toBeGreaterThan(0);
  });

  it("renders real Arabic content and flips the document to RTL", () => {
    render(<CatalogPage lang="ar" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("كتالوج المنتجات");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
