import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatementBand } from "./StatementBand";
import { homeContent } from "../content/home";

describe("StatementBand", () => {
  it("renders the real brand statement text and real data-derived stats", async () => {
    render(
      <StatementBand
        text={homeContent.tr.howWeWork.sloganText}
        stats={[
          { value: String(homeContent.tr.categories.length), label: "Ürün Kategorisi" },
          { value: String(homeContent.tr.team.length), label: "Uzman Ekip Üyesi" },
        ]}
      />,
    );
    expect(
      screen.getByText("Tüm Malzeme İhtiyaçlarınızı Bize Bırakın, Her Şeye Çözümümüz Var."),
    ).toBeInTheDocument();
    // Stat numbers count up via Framer Motion once in view, so wait for the real values.
    expect(await screen.findByText("9")).toBeInTheDocument();
    expect(await screen.findByText("4")).toBeInTheDocument();
  });
});
