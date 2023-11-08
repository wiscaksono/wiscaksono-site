import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "./ui/button";
import { Projects } from "contentlayer/generated";

const Card = ({ data }: { data: Projects }) => {
  return (
    <Dialog>
      <DialogTrigger data-umami-event={`${data.title} Card`}>
        <article className="bg-layout rounded-lg overflow-hidden group shadow-2xl hover:shadow-lines/50 transition-shadow duration-500 border border-lines">
          <figure className="relative aspect-video overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              blurDataURL={data.image}
              placeholder="blur"
              quality={10}
              fill
              sizes="100%"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="w-full h-full absolute z-30 flex items-center justify-center rounded-t-lg bg-layout/80 backdrop-blur-sm overflow-hidden group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-white text-3xl italic font-semibold uppercase">{data.title}</p>
            </div>
          </figure>

          <div className="p-3">
            <p className="line-clamp-5 text-off-white text-left text-sm">{data.summary}</p>
          </div>
        </article>
      </DialogTrigger>
      <DialogContent className="shadow-2xl shadow-lines/80">
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            <div className="relative aspect-video overflow-hidden rounded-lg mb-5">
              <Image src={data.image} alt="" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
            </div>
            {data.tag && (
              <div className="space-x-1">
                {data.tag.map((tech, i) => (
                  <Badge key={i}>{tech}</Badge>
                ))}
              </div>
            )}
            <p className="whitespace-pre-line mt-2">{data.summary}</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href={`/projects/${data.title.toLowerCase()}`} className={buttonVariants({ variant: "default" })}>
            Details
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
