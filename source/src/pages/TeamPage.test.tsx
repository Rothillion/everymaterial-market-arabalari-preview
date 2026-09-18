import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TeamPage } from "./TeamPage";

describe("TeamPage", () => {
  it("renders real Turkish team content with all 5 members", () => {
    render(<TeamPage lang="tr" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Ekibimiz");
    expect(screen.getByText("Bedirhan Kavraş")).toBeInTheDocument();
    expect(screen.getByText("bilal@everymaterial.com")).toBeInTheDocument();
    expect(screen.getByText(/Tüm Hakları Saklıdır/)).toBeInTheDocument();
  });

  it("renders real Arabic content and flips the document to RTL", () => {
    render(<TeamPage lang="ar" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("فريقنا");
    expect(screen.getByText("بدر هان كافراش")).toBeInTheDocument();
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });
});
