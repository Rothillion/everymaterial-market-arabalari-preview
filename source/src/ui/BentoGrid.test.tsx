import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoGrid } from "./BentoGrid";
import { homeContent } from "../content/home";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

describe("BentoGrid", () => {
  it("renders every real category tile, its index badge, and the CTA", () => {
    const { categories } = homeContent.tr;
    render(<BentoGrid items={categories} title="Kategoriler" ctaLabel="Tüm Kategoriler" eyebrow="01 / Kategoriler" />);

    categories.forEach((category, i) => {
      const expectedLabel = `${pad(i + 1)}. ${category.name}`;
      expect(screen.getByText((_, element) => element?.textContent === expectedLabel)).toBeInTheDocument();
      expect(screen.getByAltText(category.name)).toBeInTheDocument();
      expect(screen.getByText(`${pad(i + 1)}/${pad(categories.length)}`)).toBeInTheDocument();
    });
    expect(screen.getByText("Tüm Kategoriler")).toBeInTheDocument();
  });

  it("handles item counts that don't divide evenly into rows of four", () => {
    const { projects } = homeContent.tr;
    expect(projects.length).toBe(9);
    render(<BentoGrid items={projects} title="Projeler" ctaLabel="Tümünü Gör" />);

    projects.forEach((project) => {
      expect(screen.getByAltText(project.name)).toBeInTheDocument();
    });
  });
});
