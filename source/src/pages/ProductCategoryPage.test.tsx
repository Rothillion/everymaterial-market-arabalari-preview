import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ProductCategoryPage } from "./ProductCategoryPage";

describe("ProductCategoryPage", () => {
  afterEach(() => {
    cleanup();
    window.sessionStorage.clear();
    window.history.pushState({}, "", "/");
  });

  it("keeps the legacy detail URL while handing off the selected card variant", () => {
    window.history.pushState({}, "", "/kategoriler-tr.html?slug=market-ekipmanlari");

    render(<ProductCategoryPage lang="tr" />);

    const card = document.querySelector<HTMLAnchorElement>(
      'a[href="/kategori-urun-tr.html?slug=100-l-metal-shopping-cart"]',
    );
    expect(card).not.toBeNull();
    expect(screen.getByAltText("100 lt Metal Market Arabası")).toHaveClass("object-contain");

    card!.addEventListener("click", (event) => event.preventDefault(), { once: true });

    fireEvent.click(card!);

    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"tr","slug":"100-l-metal-shopping-cart","visualKey":"market-ekipmanlari:100-l-metal-shopping-cart:01"}',
    );
  });
});
