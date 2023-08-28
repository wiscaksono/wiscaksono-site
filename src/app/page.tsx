import Polyrhythmic from "@/components/Polyrhythmic";

export default function Home() {
  return (
    <section className="flex items-center justify-center gap-20 p-5">
      <div className="md:space-y-10 space-y-8 relative z-10">
        <div>
          <p className="text-white text-lg font-extralight">Hi all. I am</p>
          <h1 className="text-white md:text-6xl text-4xl font-medium">
            Wisnu Wicaksono
          </h1>
          <h2 className="text-purple md:text-3xl text-xl">
            <span className="animate-pulse">&gt; </span>
            Front-end developer
          </h2>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-off-white">
            {`// you can also see it on my Github page`}
          </p>
          <p className="text-off-white">
            <span className="text-purple">const</span>{" "}
            <span className="text-green">githubLink</span>{" "}
            <span className="text-white">=</span>{" "}
            <a
              target="_blank"
              href="https://github.com/wiscaksono/wiscaksono-site"
              className="text-light-brown hover:underline"
            >
              “https://github.com/wiscaksono/wiscaksono-site”
            </a>
          </p>
        </div>
      </div>
      <Polyrhythmic />
    </section>
  );
}
