import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TeamTeaser } from "./TeamTeaser";
import { homeContent } from "../content/home";

describe("TeamTeaser", () => {
  it("renders all 4 real team members with initials monograms, not photos", () => {
    render(
      <TeamTeaser members={homeContent.tr.team} title="Uzman Ekibimiz" ctaLabel="Tüm Ekibimiz" ctaHref="/team-tr.html" />,
    );
    expect(screen.getByText("Muhammet Bilal Kavras")).toBeInTheDocument();
    expect(screen.getByText("MB")).toBeInTheDocument();
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});
