import { notFound } from "next/navigation";
import { mockItemTypes } from "@/lib/mock-data";

const VALID_TYPES = new Set(
  mockItemTypes.map((t) => `${t.name.toLowerCase()}s`),
);

export default async function ItemsByTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!VALID_TYPES.has(type)) {
    notFound();
  }

  const label = type.charAt(0).toUpperCase() + type.slice(1);
  return <h2 className="text-lg font-semibold">{label}</h2>;
}
