import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchInputSkeleton = () => {
  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
        <Input
          placeholder="Loading..."
          className={`pl-9 pr-4 py-5 text-sm bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984] transition-all 
          `}
        />
      </div>
    </div>
  );
};

export default SearchInputSkeleton;
