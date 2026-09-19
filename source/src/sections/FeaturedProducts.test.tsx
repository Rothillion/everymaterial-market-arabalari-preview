import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeaturedProducts } from "./FeaturedProducts";
import { homeContent } from "../content/home";

describe("FeaturedProducts", () => {
  it("renders the first product as the active reel card and advances to the next on tap", () => {
    render(
      <FeaturedProducts
        products={homeContent.tr.featuredProducts}
        title="En Çok Tercih Edilenler"
        ctaLabel="Tümünü Gör"
        ctaHref="/katalog-tr.html"
        lang="tr"
      />,
    );
    // Reel shows exactly one active heading (the current product) at a time.
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(1);
    expect(screen.getByText(homeContent.tr.featuredProducts[0].name)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Sonraki ürün" }));
    expect(screen.getByText(homeContent.tr.featuredProducts[1].name)).toBeInTheDocument();
  });

  it("uses a product's declared contained fit and position on the active image", () => {
    render(
      <FeaturedProducts
        products={[
          {
            name: "Packshot fallback",
            image: "/assets/img/urunler/thumb/fantastik-kutu-1.jpg",
            imageFit: "contain",
            imagePosition: "center bottom",
          },
        ]}
        title="Featured products"
        ctaLabel="View all"
        ctaHref="/katalog-tr.html"
        lang="en"
      />,
    );

    const image = screen.getByAltText("Packshot fallback");
    expect(image).toHaveClass("object-contain");
    expect(image).toHaveStyle({ objectPosition: "center bottom" });
  });
});
