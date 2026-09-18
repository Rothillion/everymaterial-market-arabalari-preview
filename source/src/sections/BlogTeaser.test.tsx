import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogTeaser } from "./BlogTeaser";
import { homeContent } from "../content/home";

describe("BlogTeaser", () => {
  it("renders all 9 real blog posts with the asymmetric grid pattern", () => {
    render(
      <BlogTeaser
        posts={homeContent.tr.blogPosts}
        title="Son Yazılar"
        ctaLabel="Tümünü Gör"
        ctaHref="/blog-tr.html"
        readMoreLabel="Devamını Oku"
        lang="tr"
      />,
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(9);
    expect(screen.getByText("Özel Ölçü Pleksi Kutu Sipariş Rehberi")).toBeInTheDocument();
  });
});
