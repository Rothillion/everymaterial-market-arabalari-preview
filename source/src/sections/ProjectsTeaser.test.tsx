import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsTeaser } from "./ProjectsTeaser";
import { homeContent } from "../content/home";

describe("ProjectsTeaser", () => {
  it("renders all 9 real projects as accordion bars, with the first project expanded initially", () => {
    render(<ProjectsTeaser projects={homeContent.tr.projects} title="Projelerimiz" ctaLabel="Tüm Projeler" />);
    homeContent.tr.projects.forEach((project) => {
      expect(screen.getByRole("button", { name: project.name })).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: homeContent.tr.projects[0].name })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getAllByText("Tüm Projeler").length).toBeGreaterThan(0);
  });
});
