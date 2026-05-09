import { mockItems, mockItemTypes } from "@/lib/mock-data";
import { ItemCard } from "./ItemCard";
import { SectionHeader } from "./SectionHeader";

export function RecentItemsSection() {
  const recent = [...mockItems]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10);

  return (
    <section>
      <SectionHeader title="Recent Items" href="/items" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {recent.map((item) => {
          const type = mockItemTypes.find((t) => t.id === item.itemTypeId);
          return <ItemCard key={item.id} item={item} type={type} />;
        })}
      </div>
    </section>
  );
}
