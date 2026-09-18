import { ProjectOrbit } from "../ui/ProjectOrbit";
import type { ProjectTeaser } from "../content/home";

export function ProjectsTeaser({
  projects,
  title,
  ctaLabel,
  eyebrow,
}: {
  projects: ProjectTeaser[];
  title: string;
  ctaLabel: string;
  eyebrow?: string;
}) {
  return <ProjectOrbit items={projects} title={title} ctaLabel={ctaLabel} eyebrow={eyebrow} />;
}
