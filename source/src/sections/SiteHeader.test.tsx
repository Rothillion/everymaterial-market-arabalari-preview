import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders the real nav labels for Turkish", () => {
    render(<SiteHeader lang="tr" activePage="home" onLangChange={() => {}} />);
    expect(screen.getByText("Ana Sayfa")).toBeInTheDocument();
    expect(screen.getByText("İhracat Danışmanlığı")).toBeInTheDocument();
    expect(screen.getByText("Sizi Arayalım")).toBeInTheDocument();
  });

  it("lists the 6 nav-visible categories in the dropdown, excluding the 3 hidden ones", () => {
    render(<SiteHeader lang="tr" activePage="home" onLangChange={() => {}} />);
    expect(screen.getByText("Pleksi Teşhir Ekipmanları")).toBeInTheDocument();
    expect(screen.getByText("Market Ekipmanları")).toBeInTheDocument();
    // 2026-08-26 (user decision): these 3 categories stay live at their existing URLs but
    // are removed from every nav/menu surface — see HIDDEN_FROM_NAV_SLUGS.
    expect(screen.queryByText("Raf Sistemleri")).not.toBeInTheDocument();
    expect(screen.queryByText("Makineler")).not.toBeInTheDocument();
    expect(screen.queryByText("Dolaplar ve Depolama Sistemleri")).not.toBeInTheDocument();
  });

  it("links Hakkımızda to the real About page instead of a dead #", () => {
    render(<SiteHeader lang="tr" activePage="home" onLangChange={() => {}} />);
    expect(screen.getByText("Hakkımızda").closest("a")).toHaveAttribute("href", "/about-tr.html");
  });

  it("links Ekibimiz to the real Team page instead of a dead #", () => {
    render(<SiteHeader lang="tr" activePage="home" onLangChange={() => {}} />);
    expect(screen.getByText("Ekibimiz").closest("a")).toHaveAttribute("href", "/team-tr.html");
  });

  it("opens a mobile nav panel with the real links on menu-button click, and closes on link click", () => {
    render(<SiteHeader lang="tr" activePage="home" onLangChange={() => {}} />);
    expect(document.getElementById("mobile-nav-panel")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Menü"));
    const panel = document.getElementById("mobile-nav-panel");
    expect(panel).toBeInTheDocument();
    const panelScope = within(panel!);
    expect(panelScope.getByText("Blog")).toBeInTheDocument();
    expect(panelScope.getByText("Kapaklar")).toBeInTheDocument();

    fireEvent.click(panelScope.getByText("Blog"));
    expect(screen.getByLabelText("Menü")).toHaveAttribute("aria-expanded", "false");
  });
});
