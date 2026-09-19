import { ProjectOrbit } from "../ui/ProjectOrbit";
import type { ProjectTeaser } from "../content/home";

export function ProjectsTeaser({
  projects,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
  projectLabel,
}: {
  projects: ProjectTeaser[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
  projectLabel: string;
}) {
  return <ProjectOrbit items={projects} title={title} ctaLabel={ctaLabel} ctaHref={ctaHref} eyebrow={eyebrow} projectLabel={projectLabel} />;
}
