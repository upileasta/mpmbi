import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  label: string;
  column: string;
  currentSort: string;
  currentOrder: "asc" | "desc" | "";
  searchParams: Record<string, string | string[] | undefined>;
}

export function SortableHeader({
  label,
  column,
  currentSort,
  currentOrder,
  searchParams,
}: SortableHeaderProps) {
  const isSorted = currentSort === column;
  const newOrder = isSorted && currentOrder === "asc" ? "desc" : "asc";

  // Build the new search params
  const params = new URLSearchParams(searchParams as unknown as Record<string, string>);
  params.set("sort", column);
  params.set("order", newOrder);

  // Preserve other filters but return to page 1 on sort change
  params.set("page", "1");

  const href = `?${params.toString()}`;

  return (
    <th className="py-4 px-4 text-left group">
      <Link href={href} className="flex items-center gap-2 hover:text-slate-900 transition-colors w-fit">
        {label}
        <span className="flex-shrink-0 text-slate-400 group-hover:text-slate-600 transition-colors">
          {!isSorted ? (
            <ArrowUpDown size={14} className="opacity-50" />
          ) : currentOrder === "asc" ? (
            <ArrowUp size={14} className="text-primary font-bold" />
          ) : (
            <ArrowDown size={14} className="text-primary font-bold" />
          )}
        </span>
      </Link>
    </th>
  );
}
