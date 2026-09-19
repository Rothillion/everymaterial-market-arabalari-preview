import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { homeContent } from "../content/home";
import { siteContent } from "../content/site";

describe("Hero", () => {
  it("renders the real SEO heading, the first real slide image, and the real dual CTAs", () => {
    render(
      <Hero
        slides={homeContent.tr.heroSlides}
        seoH1={homeContent.tr.seo.h1}
        seoDescription={homeContent.tr.seo.description}
        catalogLabel={siteContent.tr.footer.catalogLink}
        catalogHref="#"
        callLabel={siteContent.tr.nav.callButton}
        callHref={siteContent.tr.contact.phoneHref}
        lang="tr"
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "EveryMaterial | Pleksi Kutu, Cam, Ahşap ve Akrilik Teşhir Ekipmanları",
    );
    const firstImg = screen.getByAltText("EveryMaterial showroom ve üretim");
    expect(firstImg).toHaveAttribute("src", "/assets/img/slider/Bener1.jpg");
    expect(screen.getByRole("link", { name: "Kataloğa Göz Atın" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sizi Arayalım" })).toHaveAttribute(
      "href",
      "tel:+905459111002",
    );
  });
});
