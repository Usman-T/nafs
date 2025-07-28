"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils/utils";

const tabs = [
  { label: "General", value: "general" },
  { label: "Account", value: "account" },
  { label: "Privacy", value: "privacy" },
];

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-[#3c3836] rounded-md", className)} />
);

const LoadingSettings = () => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="bg-[#1d2021] border border-[#3c3836] mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-[#3c3836] data-[state=active]:text-[#ebdbb2]"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="space-y-6">
        <div className="bg-[#282828] border border-[#3c3836] rounded-xl p-6 space-y-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
          ))}

          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
              <Skeleton className="h-10 w-full md:w-[250px] rounded-md" />
            </div>
          ))}

          <div className="flex justify-end pt-4 border-t border-[#3c3836]">
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </Tabs>
  );
};

export default LoadingSettings;
