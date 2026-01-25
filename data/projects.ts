import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Meta Perturbed Re-Id Defense",
    description:
      "A novel approach to adversarial robustness in person re-identification systems. Introduced anisotropic and isotropic perturbations to design a stochastic neural network, and derived a novel feature covariance alignment (FCA) loss achieving high clean performance while providing robustness against different attacks. Published at IEEE ICME 2023.",
    tags: ["PyTorch", "Deep Learning", "Computer Vision", "Neural Networks", "Research"],
    image: "/images/projects/ieee-paper.svg",
    liveUrl: "https://doi.ieeecomputersociety.org/10.1109/ICME55011.2023.00442",
    githubUrl: "https://github.com",
    featured: true,
  },
];
