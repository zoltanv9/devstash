import { mockItems, mockItemTypes } from "@/lib/mock-data";
import { ItemCard } from "./ItemCard";
import { SectionHeader } from "./SectionHeader";

export function PinnedItemsSection() {
  const pinned = mockItems.filter((i) => i.isPinned);

  if (pinned.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Pinned Items" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pinned.map((item) => {
          const type = mockItemTypes.find((t) => t.id === item.itemTypeId);
          return <ItemCard key={item.id} item={item} type={type} />;
        })}
      </div>
    </section>
  );
}
