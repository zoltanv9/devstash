import { mockCollections, mockItemTypes } from "@/lib/mock-data";
import { CollectionCard } from "./CollectionCard";
import { SectionHeader } from "./SectionHeader";

export function CollectionsSection() {
  const collections = [...mockCollections]
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite))
    .slice(0, 4);

  return (
    <section>
      <SectionHeader title="Collections" href="/collections" />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((col) => {
          const type = mockItemTypes.find((t) => t.id === col.defaultTypeId);
          return (
            <CollectionCard key={col.id} collection={col} type={type} />
          );
        })}
      </div>
    </section>
  );
}
