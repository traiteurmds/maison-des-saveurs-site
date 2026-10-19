import { cn } from "../../lib/utils";
import Reveal from "./Reveal";
import TitleReveal from "./TitleReveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
};

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
  as: Tag = "h2",
}: Props) {
  const center = align === "center";
  return (
    <Reveal className={cn(center && "mx-auto text-center", "max-w-3xl", tone === "dark" && "on-dark", className)}>
      {eyebrow && <p className={cn("eyebrow", center && "eyebrow-center")}>{eyebrow}</p>}
      <TitleReveal as={Tag} className={cn("display-lg mt-5", tone === "dark" ? "text-ivory" : "text-ink")}>{title}</TitleReveal>
      {intro && <p className={cn("lead mt-6", center && "mx-auto max-w-2xl")}>{intro}</p>}
    </Reveal>
  );
}
