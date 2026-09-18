import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { Lang } from "../content/types";
import {
  CategoryProductDetailPage,
  prepareCategoryProductLanguageNavigation,
} from "./CategoryProductDetailPage";

function renderCoffeeMill(lang: Lang = "tr") {
  window.history.pushState({}, "", `/kategori-urun-${lang}.html?slug=coffee-mill`);
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

  it("restores the selected duplicate variant and uses the active image role fit", () => {
    window.sessionStorage.setItem(
      "everymaterial:catalog-selection:v1",
      '{"lang":"tr","slug":"coffee-mill","visualKey":"makineler:coffee-mill:02"}',
    );

    renderCoffeeMill();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Kahve Değirmeni");
    expect(screen.getByTestId("product-main-image")).toHaveAttribute(
      "src",
      "/assets/img/urunler/hazir/coffee-mill-b-1-hero.png",
    );
    expect(screen.getByTestId("product-main-image")).toHaveClass("object-contain");

    fireEvent.click(screen.getByRole("button", { name: "Kullanım" }));

    expect(screen.getByTestId("product-main-image")).toHaveClass("object-cover");
  });

  it("falls back to the first catalog match when the legacy URL has no handoff state", () => {
    renderCoffeeMill();

    expect(screen.getByTestId("product-main-image")).toHaveAttribute(
      "src",
      "/assets/img/urunler/hazir/coffee-mill-a-1-hero.png",
    );
  });

  it("stores the current duplicate variant for the target language before switching", () => {
    window.sessionStorage.setItem(
      "everymaterial:catalog-selection:v1",
      '{"lang":"tr","slug":"coffee-mill","visualKey":"makineler:coffee-mill:02"}',
    );
    renderCoffeeMill();

    fireEvent.click(screen.getAllByLabelText("Dil seçimi")[0]);
    fireEvent.click(screen.getByRole("button", { name: "English" }));

    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"en","slug":"coffee-mill","visualKey":"makineler:coffee-mill:02"}',
    );
  });

  it("keeps the exact English legacy target and restores its selected duplicate", () => {
    expect(
      prepareCategoryProductLanguageNavigation("en", {
        slug: "coffee-mill",
        visualKey: "makineler:coffee-mill:02",
      }),
    ).toBe("/kategori-urun-en.html?slug=coffee-mill");
    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"en","slug":"coffee-mill","visualKey":"makineler:coffee-mill:02"}',
    );

    renderCoffeeMill("en");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Coffee Mill");
    expect(screen.getByTestId("product-main-image")).toHaveAttribute(
      "src",
      "/assets/img/urunler/hazir/coffee-mill-b-1-hero.png",
    );
  });

  it("keeps the related card legacy href and hands off its exact sibling variant", () => {
    window.sessionStorage.setItem(
      "everymaterial:catalog-selection:v1",
      '{"lang":"tr","slug":"coffee-mill","visualKey":"makineler:coffee-mill:02"}',
    );
    renderCoffeeMill();

    const relatedCard = document.querySelector<HTMLAnchorElement>(
      'a[href="/kategori-urun-tr.html?slug=coffee-mill"]',
    );
    expect(relatedCard).not.toBeNull();
    relatedCard!.addEventListener("click", (event) => event.preventDefault(), { once: true });

    fireEvent.click(relatedCard!);

    expect(window.sessionStorage.getItem("everymaterial:catalog-selection:v1")).toBe(
      '{"lang":"tr","slug":"coffee-mill","visualKey":"makineler:coffee-mill:01"}',
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
