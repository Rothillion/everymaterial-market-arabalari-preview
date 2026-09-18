import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ProductDetailPage } from "./ProductDetailPage";

function renderWithSlug(slug: string, lang: "tr" | "ar" = "tr") {
  window.history.pushState({}, "", `/urun-${lang}.html?slug=${slug}`);
  return render(<ProductDetailPage lang={lang} />);
}

describe("ProductDetailPage", () => {
  afterEach(() => {
    cleanup();
    window.history.pushState({}, "", "/");
  });

  it("clips decorative hero overflow at the page root on narrow viewports", () => {
    const { container } = renderWithSlug("150-lt-metal-market-arabasi");
    expect(container.firstElementChild).toHaveClass("overflow-x-hidden");
  });

  it("renders a real matched product with its real 'about' paragraph and code badge", async () => {
    renderWithSlug("150-lt-metal-market-arabasi");
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent("150 Lt Metal Market Arabası");
    expect(screen.getByText("KM-150")).toBeInTheDocument();
    expect(screen.getByText(/Klasik süpermarket market arabası tasarımına sahip/)).toBeInTheDocument();
  });

  it("renders a real unmatched in-scope product without a paragraph or code badge", async () => {
    renderWithSlug("20-lt-metal-el-sepeti");
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent("20 Lt Metal El Sepeti");
    expect(screen.queryByText("Ürün Hakkında")).not.toBeInTheDocument();
  });

  it("renders real Arabic content and flips the document to RTL", async () => {
    renderWithSlug("25-lt-metal-cocuk-arabasi", "ar");
    await screen.findByRole("heading", { level: 1 });
    expect(document.documentElement.dir).toBe("rtl");
  });

  it("keeps market-cart gallery and related product media contain-safe", async () => {
    renderWithSlug("150-lt-metal-market-arabasi");

    const mainImage = await screen.findByAltText("150 Lt Metal Market Arabası");
    expect(mainImage).toHaveClass("object-contain");

    const thumbnail = document.querySelector<HTMLImageElement>("button img");
    expect(thumbnail).not.toBeNull();
    expect(thumbnail).toHaveClass("object-contain");

    const relatedImage = document.querySelector<HTMLImageElement>(
      'a[href="/urun-tr.html?slug=100-lt-metal-market-arabasi"] img',
    );
    expect(relatedImage).not.toBeNull();
    expect(relatedImage).toHaveClass("object-contain");
  });
});
