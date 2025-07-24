import Image from "next/image";
const Footer = () => {
  return (
    <footer className="border-t text-black mt-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-8 text-sm">
        <Image src="/logo.png" alt="logo" width={50} height={50}></Image>
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
