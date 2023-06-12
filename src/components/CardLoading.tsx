import { Skeleton } from "./ui/skeleton";

export default function CardLoading() {
  return (
    <div className="bg-layout rounded-lg overflow-hidden group shadow-2xl hover:shadow-lines/50 transition-shadow duration-500 border border-lines">
      <div className="aspect-video">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-5 space-y-2.5">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
