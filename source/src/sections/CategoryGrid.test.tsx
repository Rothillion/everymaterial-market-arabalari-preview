import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryGrid } from "./CategoryGrid";
import { homeContent } from "../content/home";

describe("CategoryGrid", () => {
  it("renders all 9 real categories", () => {
    render(
      <CategoryGrid
        categories={homeContent.tr.categories.map((c, i) => ({ ...c, href: `/kategoriler-tr.html?slug=cat-${i}` }))}
        title="Kategoriler"
        ctaLabel="Tüm Kategoriler"
        ctaHref="/katalog-tr.html"
      />,
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(9);
    expect(screen.getByText("Dolaplar ve Depolama Sistemleri")).toBeInTheDocument();
  });
});
