import Link from "next/link";

export function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-base font-semibold">{title}</h2>
      {href && (
        <Link
          href={href}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </Link>
      )}
    </div>
  );
}
