import CardLoading from "@/components/CardLoading";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLayout() {
  return (
    <section className="grid grid-cols-12 overflow-hidden">
      <aside className="col-span-2 border-r border-lines">
        <div className="space-y-2">
          {Array(5).map((_, i) => (
            <div className="flex items-center gap-x-2" key={i}>
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-[50%] h-3.5" />
            </div>
          ))}
        </div>
      </aside>
      <section className="col-span-10 overflow-y-auto">
        <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-5 p-5 ">
          {Array(10).map((_, i) => (
            <CardLoading key={i} />
          ))}
        </div>
      </section>
    </section>
  );
}
