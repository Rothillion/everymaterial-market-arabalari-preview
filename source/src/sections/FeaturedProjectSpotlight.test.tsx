import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedProjectSpotlight } from "./FeaturedProjectSpotlight";
import { homeContent } from "../content/home";

describe("FeaturedProjectSpotlight", () => {
  it("renders title-matched alt text for both authentic featured project images", () => {
    const { projects, ctaBand } = homeContent.tr;
    render(
      <FeaturedProjectSpotlight
        title="Projelerimiz"
        eyebrow="04 / Projeler"
        heroProject={projects[0]}
        detailProject={projects[1]}
        promoTitle={ctaBand.promoTitle}
        promoBody={ctaBand.promoBody}
        promoBullet={ctaBand.promoBullets[0]}
      />,
    );
    expect(screen.getByAltText(projects[0].name)).toHaveAttribute("src", projects[0].image);
    expect(screen.getByAltText(projects[1].name)).toHaveAttribute("src", projects[1].image);
    expect(screen.getByText(ctaBand.promoTitle)).toBeInTheDocument();
  });

  it("applies each featured project's declared fit and position", () => {
    const { ctaBand } = homeContent.tr;
    render(
      <FeaturedProjectSpotlight
        title="Projelerimiz"
        heroProject={{
          name: "Contained hero project",
          image: "/assets/img/proje/4e64fdac-1438-4f2d-8f5e-255dde274dbd.jpeg",
          imageFit: "contain",
          imagePosition: "25% 75%",
        }}
        detailProject={{
          name: "Covered detail project",
          image: "/assets/img/proje/thumb/silolar.jpg",
          imageFit: "cover",
          imagePosition: "75% 25%",
        }}
        promoTitle={ctaBand.promoTitle}
        promoBody={ctaBand.promoBody}
        promoBullet={ctaBand.promoBullets[0]}
      />,
    );

    const heroImage = screen.getByAltText("Contained hero project");
    expect(heroImage).toHaveClass("object-contain");
    expect(heroImage).toHaveStyle({ objectPosition: "25% 75%" });

    const detailImage = screen.getByAltText("Covered detail project");
    expect(detailImage).toHaveClass("object-cover");
    expect(detailImage).toHaveStyle({ objectPosition: "75% 25%" });
  });
});
