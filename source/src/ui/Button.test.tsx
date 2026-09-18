import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders as a link when href is given", () => {
    render(<Button href="/talep-tr.html">Sizi Arayalım</Button>);
    const link = screen.getByRole("link", { name: "Sizi Arayalım" });
    expect(link).toHaveAttribute("href", "/talep-tr.html");
  });

  it("renders as a button when no href is given", () => {
    render(<Button>Gönder</Button>);
    expect(screen.getByRole("button", { name: "Gönder" })).toBeInTheDocument();
  });

  it("applies outline styling when variant is outline", () => {
    render(<Button variant="outline">Tüm Kategoriler</Button>);
    expect(screen.getByRole("button").className).toContain("border");
  });
});
