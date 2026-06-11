"use client";

import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Saat mencari, selalu kembalikan ke halaman 1
    params.set("page", "1");
    
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-xl border-2 border-slate-200 bg-white py-[9px] pl-10 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-semibold"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 peer-focus:text-primary" />
    </div>
  );
}
