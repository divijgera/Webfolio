import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper>
      <About />
      <Skills />
    </PageWrapper>
  );
}
