import { CollectionsSection } from "@/components/dashboard/CollectionsSection";
import { PinnedItemsSection } from "@/components/dashboard/PinnedItemsSection";
import { RecentItemsSection } from "@/components/dashboard/RecentItemsSection";
import { StatsCards } from "@/components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Items</h1>
      </div>
      <StatsCards />
      <CollectionsSection />
      <PinnedItemsSection />
      <RecentItemsSection />
    </div>
  );
}
