import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="overflow:hidden flex w-full items-center justify-between border bg-white p-4">
      <Image src="/logo.png" alt="logo" width={50} height={50}></Image>
    </nav>
  );
};

export default Navbar;
