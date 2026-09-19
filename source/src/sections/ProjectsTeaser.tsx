import { ProjectOrbit } from "../ui/ProjectOrbit";
import type { ProjectTeaser } from "../content/home";

export function ProjectsTeaser({
  projects,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
}: {
  projects: ProjectTeaser[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
}) {
  return <ProjectOrbit items={projects} title={title} ctaLabel={ctaLabel} ctaHref={ctaHref} eyebrow={eyebrow} />;
}
