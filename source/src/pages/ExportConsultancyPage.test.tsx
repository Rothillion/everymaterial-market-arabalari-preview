import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExportConsultancyPage } from "./ExportConsultancyPage";

describe("ExportConsultancyPage", () => {
  it("renders the real Turkish content", () => {
    render(<ExportConsultancyPage lang="tr" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("İhracat Danışmanlığı");
    expect(screen.getByText("Pazar Araştırması ve Analizi")).toBeInTheDocument();
    expect(screen.getAllByText(/İhracat Sürecinizi Birlikte Planlayalım/).length).toBeGreaterThan(0);
  });

  it("renders real Arabic content and flips the document to RTL", () => {
    render(<ExportConsultancyPage lang="ar" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("استشارات التصدير");
    expect(document.documentElement.dir).toBe("rtl");
  });
});
