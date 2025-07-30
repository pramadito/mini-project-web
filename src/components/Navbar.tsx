import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="overflow-hidden flex w-full items-center justify-between gap-4 border-t border-b border-gray-700 bg-black px-4 py-4 text-sm">
      <p className="motion-preset-slide-left motion-duration-2000 mb-5 text-center text-xl font-bold text-white md:text-2xl">
        OTO{" "}
        <span className="bg-[linear-gradient(to_left,_#df8908_10%,_#ff1d15_100%)] bg-clip-text font-bold text-transparent">
          EVENT
        </span>
      </p>

      <ModeToggle />
    </nav>
  );
};

export default Navbar;
