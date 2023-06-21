import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import projectData from "../app/projects/[tech]/projectData.json";

type CardProps = (typeof projectData)[0];

const Card = ({ data }: { data: CardProps }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <article className="bg-layout rounded-lg overflow-hidden group shadow-2xl hover:shadow-lines/50 transition-shadow duration-500 border border-lines">
          <figure className="relative aspect-video overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="w-full h-full absolute z-30 flex items-center justify-center bg-layout/80 backdrop-blur-sm rounded-t-lg overflow-hidden group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-white text-3xl italic font-semibold uppercase">
                {data.title}
              </p>
            </div>
          </figure>
          <div className="p-5">
            <p className="line-clamp-3 text-off-white text-left">
              {data.description}
            </p>
          </div>
        </article>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            <div className="relative aspect-video overflow-hidden rounded-lg mb-5">
              <Image
                src={data.image}
                alt=""
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {data.technology && (
              <div className="space-x-1">
                {data.technology.map((tech, i) => (
                  <Badge key={i}>{tech}</Badge>
                ))}
              </div>
            )}
            <p className="whitespace-pre-line mt-2">{data.description}</p>
            {data.features && (
              <>
                <p className="mb-2">
                  Here are some of the features of {data.title}&apos;s platform:
                </p>
                <ul className="list-disc list-outside ml-4 space-y-2">
                  {data.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
