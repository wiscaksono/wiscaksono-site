import Link from "next/link";
export default function Layout({ children, className }) {
  return (
    <div className={className}>
      <nav className="flex items-center justify-between w-[90%] mx-auto mt-11">
        <Link href="/">
          <a className="text-4xl font-extrabold">wsn.</a>
        </Link>

        <div className="flex flex-col items-end">
          <h6 className="font-semibold">self service</h6>
          <p className="font-light text-xs">20% OFF</p>
        </div>
      </nav>

      <div className="w-[90%] mx-auto">{children}</div>
    </div>
  );
}
