"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Jangan tampilkan pagination jika hanya ada 1 halaman atau kurang
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-500 font-medium">
        Halaman <span className="font-bold text-slate-900">{currentPage}</span> dari <span className="font-bold text-slate-900">{totalPages}</span>
      </p>
      
      <div className="inline-flex items-center space-x-2">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {/* Sederhana: Tampilkan semua halaman jika sedikit, atau pakai logika elipsis jika banyak. 
              Untuk sekarang kita tampilkan angka di sekitar current page */}
          {generatePagination(currentPage, totalPages).map((page, index) => {
            if (page === "...") {
              return (
                <div key={index} className="px-4 py-2 text-sm font-bold text-slate-500">...</div>
              );
            }

            return (
              <PaginationNumber
                key={index}
                href={createPageURL(page)}
                page={page}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return isActive ? (
    <div className="z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-md mx-1">
      {page}
    </div>
  ) : (
    <Link
      href={href}
      className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-transparent text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all mx-1"
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = `flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-200 text-slate-600 transition-all ${
    isDisabled ? "pointer-events-none opacity-50 bg-slate-50" : "hover:bg-slate-100 hover:border-slate-300 bg-white shadow-sm"
  }`;

  const icon =
    direction === "left" ? (
      <ChevronLeft className="w-4 h-4" />
    ) : (
      <ChevronRight className="w-4 h-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

function generatePagination(currentPage: number, totalPages: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}
