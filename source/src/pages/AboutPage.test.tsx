import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("renders real Turkish About content with header and footer", () => {
    render(<AboutPage lang="tr" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hakkımızda");
    // Magazine Layout repeats the body heading (glass pull-quote panel + narrative block).
    expect(screen.getAllByText("everymaterial.com: Çözüm Ortağınız").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/8\+/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Tüm Hakları Saklıdır/)).toBeInTheDocument();
  });

  it("renders real Arabic content and flips the document to RTL", () => {
    render(<AboutPage lang="ar" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("من نحن");
    expect(screen.getAllByText("everymaterial.com: شريكك في الحلول").length).toBeGreaterThan(0);
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
