import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Lang } from "../content/types";
import {
  CategoryProductDetailPage,
  prepareCategoryProductLanguageNavigation,
} from "./CategoryProductDetailPage";

function renderCoffeeMill(lang: Lang = "tr", permalink = "coffee-mill") {
  window.history.pushState({}, "", `/kategori-urun-${lang}.html?slug=${permalink}`);
  return render(<CategoryProductDetailPage lang={lang} />);
}

describe("CategoryProductDetailPage", () => {
  afterEach(() => {
    cleanup();
    window.sessionStorage.clear();
    window.history.pushState({}, "", "/");
  });

  it("clips decorative hero overflow at the page root on narrow viewports", () => {
    const { container } = renderCoffeeMill();
    expect(container.firstElementChild).toHaveClass("overflow-x-hidden");
  });

  it("resolves the first coffee mill variant by its own unique permalink, no handoff state needed", () => {
    renderCoffeeMill("tr", "coffee-mill");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Kahve Değirmeni");
    expect(screen.getByTestId("product-main-image")).toHaveAttribute(
      "src",
      "/assets/img/urunler/hazir/coffee-mill-a-1-hero.png",
    );
  });

  it("resolves the second coffee mill variant by its own unique permalink, no handoff state needed", () => {
    renderCoffeeMill("tr", "coffee-mill-2");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Kahve Değirmeni");
    expect(screen.getByTestId("product-main-image")).toHaveAttribute(
      "src",
      "/assets/img/urunler/hazir/coffee-mill-b-1-hero.png",
    );
    expect(screen.getByTestId("product-main-image")).toHaveClass("object-contain");

    fireEvent.click(screen.getByRole("button", { name: "Kullanım" }));

    expect(screen.getByTestId("product-main-image")).toHaveClass("object-cover");
  });

  it("stores the resolved variant's own permalink for the target language before switching", () => {
    renderCoffeeMill("tr", "coffee-mill-2");

    fireEvent.click(screen.getAllByLabelText("Dil seçimi")[0]);
    fireEvent.click(screen.getByRole("button", { name: "English" }));

    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"en","slug":"coffee-mill-2","visualKey":"makineler:coffee-mill:02"}',
    );
  });

  it("builds the target-language URL from the variant's own permalink", () => {
    expect(
      prepareCategoryProductLanguageNavigation("en", {
        permalink: "coffee-mill-2",
        visualKey: "makineler:coffee-mill:02",
      }),
    ).toBe("/kategori-urun-en.html?slug=coffee-mill-2");
    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"en","slug":"coffee-mill-2","visualKey":"makineler:coffee-mill:02"}',
    );

    renderCoffeeMill("en", "coffee-mill-2");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Coffee Mill");
    expect(screen.getByTestId("product-main-image")).toHaveAttribute(
      "src",
      "/assets/img/urunler/hazir/coffee-mill-b-1-hero.png",
    );
  });

  it("links the related sibling variant by its own unique permalink and hands off its exact visualKey", () => {
    renderCoffeeMill("tr", "coffee-mill");

    const relatedCard = document.querySelector<HTMLAnchorElement>(
      'a[href="/kategori-urun-tr.html?slug=coffee-mill-2"]',
    );
    expect(relatedCard).not.toBeNull();
    relatedCard!.addEventListener("click", (event) => event.preventDefault(), { once: true });

    fireEvent.click(relatedCard!);

    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"tr","slug":"coffee-mill-2","visualKey":"makineler:coffee-mill:02"}',
    );
  });

  it("uses the same 4:3 media frame for related product cards", () => {
    renderCoffeeMill();

    const relatedMediaFrame = document.querySelector(
      'section a[href*="kategori-urun"] > div:first-child',
    );

    expect(relatedMediaFrame).toHaveClass("aspect-[4/3]");
    expect(relatedMediaFrame).not.toHaveClass("aspect-square");
  });

  it.each([
    ["tr", "Ana görsel", "Ölçü", "Detay", "Kullanım"],
    ["en", "Main image", "Dimensions", "Detail", "Usage"],
    ["de", "Hauptbild", "Maße", "Detail", "Anwendung"],
    ["ar", "الصورة الرئيسية", "الأبعاد", "التفاصيل", "الاستخدام"],
  ] as const)("exposes localized thumbnail role labels in %s", (lang, hero, dimensions, detail, usage) => {
    renderCoffeeMill(lang);

    expect(screen.getByRole("button", { name: hero })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: dimensions })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: detail })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: usage })).toBeInTheDocument();
  });
});
