import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CtaBand } from "./CtaBand";
import { homeContent } from "../content/home";

describe("CtaBand", () => {
  it("renders the real promo bullets and the real phone number", () => {
    render(<CtaBand {...homeContent.tr.ctaBand} phone="+90 545 911 10 02" phoneHref="tel:+905459111002" />);
    expect(screen.getByText("Estetik Görünüm")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /\+90 545 911 10 02/ })).toHaveAttribute(
      "href",
      "tel:+905459111002",
    );
  });
});
