import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HowWeWork } from "./HowWeWork";
import { homeContent } from "../content/home";

describe("HowWeWork", () => {
  it("renders the real teaser paragraph and the real slogan", () => {
    render(<HowWeWork title="Nasıl Çalışıyoruz?" eyebrow="02 / Süreç" {...homeContent.tr.howWeWork} />);
    expect(
      screen.getByText(homeContent.tr.howWeWork.paragraphs[0]),
    ).toBeInTheDocument();
    expect(screen.getByText("Tüm Malzeme İhtiyaçlarınızı Bize Bırakın, Her Şeye Çözümümüz Var.")).toBeInTheDocument();
  });

  it("reserves enough lower space for the offset slogan image at mobile and desktop sizes", () => {
    render(<HowWeWork title="Nasıl Çalışıyoruz?" {...homeContent.tr.howWeWork} />);

    const section = screen.getByRole("heading", { name: "Nasıl Çalışıyoruz?" }).closest("section");
    expect(section).toHaveClass("pb-32", "md:pb-72");
    expect(section).not.toHaveClass("py-16", "md:py-28");
  });
});
