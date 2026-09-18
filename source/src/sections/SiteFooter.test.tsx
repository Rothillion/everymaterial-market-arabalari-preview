import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders the real phone number and address for Turkish", () => {
    render(<SiteFooter lang="tr" />);
    expect(screen.getByText("+90 545 911 10 02")).toBeInTheDocument();
    expect(screen.getByText(/Bağcılar/)).toBeInTheDocument();
  });
});
