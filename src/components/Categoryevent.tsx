import Link from "next/link";
import Image from "next/image";

const CategoryEvent = () => {
  return (
    <section className="container mx-auto mt-12 px-4">
      <h1 className="text-left text-2xl font-semibold text-black">
        Category Event
      </h1>

      <div className="motion-preset-expand container mx-auto mt-4 grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-3">
        <div className="h-[150px] w-[150px] rounded-full border-4 border-[#ea580c] bg-[#ea580c] px-8 py-8 text-black transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-[#ea580c]">
          <Link href={"/events"}>
            <Image
              src="/singlee.webp"
              alt="pler"
              width={250}
              height={250}
            ></Image>
          </Link>
          <span className="text-1xl mt-8 flex justify-center font-bold md:text-3xl">
            single
          </span>
        </div>

        <div className="h-[150px] w-[150px] rounded-full border-4 border-[#ea580c] bg-[#ea580c] px-8 py-8 text-black transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-[#ea580c]">
          <Link href={"/events"}>
            <Image
              src="/double.webp"
              alt="pler"
              width={250}
              height={250}
            ></Image>
          </Link>
          <span className="text-1xl mt-8 flex justify-center font-bold md:text-3xl">
            double
          </span>
        </div>

        <div className="h-[150px] w-[150px] rounded-full border-4 border-[#ea580c] bg-[#ea580c] px-8 py-8 text-black transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-[#ea580c]">
          <Link href={"/events"}>
            <Image src="/team.webp" alt="pler" width={250} height={250}></Image>
          </Link>
          <span className="text-1xl mt-18 flex justify-center font-bold md:text-3xl">
            team
          </span>
        </div>
      </div>
    </section>
  );
};

export default CategoryEvent;
