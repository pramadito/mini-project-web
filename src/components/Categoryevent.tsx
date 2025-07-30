import Link from "next/link";
import Image from "next/image";

const CategoryEvent = () => {
  return (
    <section className="container mx-auto mt-12 p-4 py-4 md:px-8 lg:px-0">
      <h1 className="text-left text-3xl font-semibold text-white">
        Category Event
      </h1>

      <div className="motion-preset-expand container mx-auto mt-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-3">
        <div className="h-[150px] w-[150px] rounded-full border-2 border-white bg-[#f3f3f3] px-8 py-8 text-white transition-transform duration-300 hover:scale-110">
          <Link href={"/events"}>
            <Image
              src="/iconsolo.png"
              alt="pler"
              width={200}
              height={200}
              className="mt-5"
            ></Image>
          </Link>
          <span className="text-1xl mt-5 flex justify-center font-extralight md:text-3xl md:mt-16">
            single
          </span>
        </div>

        <div className="h-[150px] w-[150px] rounded-full border-2 border-white bg-[#f3f3f3] px-8 py-8 text-white transition-transform duration-300 hover:scale-110">
          <Link href={"/events"}>
            <Image
              src="/iconduo.png"
              alt="pler"
              width={250}
              height={250}
            ></Image>
          </Link>
          <span className="text-1xl mt-5 flex justify-center font-extralight md:text-3xl md:mt-12">
            double
          </span>
        </div>

        <div className="h-[150px] w-[150px] rounded-full border-2 border-white bg-[#f3f3f3] px-8 py-8 text-white transition-transform duration-300 hover:scale-110">
          <Link href={"/events"}>
            <Image src="/iconteam.jpeg" alt="pler" width={250} height={250}></Image>
          </Link>
          <span className="text-1xl mt-5 flex justify-center font-extralight md:text-3xl md:mt-12">
            team
          </span>
        </div>
      </div>
    </section>
  );
};

export default CategoryEvent;
