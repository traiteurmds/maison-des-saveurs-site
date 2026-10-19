import { DISHES } from "../../lib/menu-data";
import DishCard from "../menu/DishCard";
import Reveal from "../ui/Reveal";

export default function DishSelection({ ids }: { ids: string[] }) {
  const dishes = ids.map((id) => DISHES.find((d) => d.id === id)).filter((d): d is (typeof DISHES)[number] => Boolean(d));
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish, i) => (
        <Reveal key={dish.id} delay={0.05 * (i % 3)} className="h-full">
          <DishCard dish={dish} />
        </Reveal>
      ))}
    </div>
  );
}
