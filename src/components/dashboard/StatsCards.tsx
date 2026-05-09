import { Folder, FolderOpen, Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  mockCollections,
  mockItems,
  mockItemTypeCounts,
} from "@/lib/mock-data";

export function StatsCards() {
  const totalItems = mockItemTypeCounts.allItems;
  const totalCollections = mockCollections.length;
  const favoriteItems = mockItems.filter((i) => i.isFavorite).length;
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite).length;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        label="Items"
        value={totalItems}
        icon={<FolderOpen className="size-4 text-blue-400" />}
      />
      <StatCard
        label="Collections"
        value={totalCollections}
        icon={<Folder className="size-4 text-purple-400" />}
      />
      <StatCard
        label="Favorite Items"
        value={favoriteItems}
        icon={<Star className="size-4 fill-yellow-400 text-yellow-400" />}
      />
      <StatCard
        label="Favorite Collections"
        value={favoriteCollections}
        icon={<Heart className="size-4 fill-rose-400 text-rose-400" />}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
    </Card>
  );
}
