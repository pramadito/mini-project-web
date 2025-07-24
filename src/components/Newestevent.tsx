import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Raisa Ambivert Showcase",
    date: "11 Feb 2026 - 13 Feb 2026",
    price: "Rp 2.000.000",
    img: "/events/raisa.jpg",
    author: "Daniel Reinhard",
  },
  {
    id: 2,
    title: "PLAYOFF IBL GOPAY 2025",
    date: "31 Mar 2026 - 01 Apr 2026",
    price: "Rp 650.000",
    img: "/events/ibl.jpg",
    author: "Daniel Reinhard",
  },
  // Add more events...
];

export default function NewestEvents() {
  return (
    <section className="container mx-auto mt-20 px-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Newest Event</h3>
        <Link
          href="/events"
          className="text-sm text-orange-400 hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="motion-preset-expand container mx-auto mt-4 grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="rounded-xl border-4 border-[#ea580c] bg-[#ea580c] px-8 py-8 text-black transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-[#ea580c]">
          <h1 className="text-1xl mt-3 flex justify-center font-bold md:text-3xl">
            Single
          </h1>
          <p className="mt-0 md:mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            officiis eius omnis similique nisi aliquam tempore totam iusto enim
          </p>
        </div>
        <div className="rounded-xl border-4 border-[#ea580c] bg-[#ea580c] px-8 py-8 text-black transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-[#ea580c]">
          <h1 className="text-1xl mt-3 flex justify-center font-bold md:text-3xl">
            Double
          </h1>
          <p className="mt-0 md:mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            officiis eius omnis similique nisi aliquam tempore totam iusto enim
          </p>
        </div>
        <div className="rounded-xl border-4 border-[#ea580c] bg-[#ea580c] px-8 py-8 text-black transition-transform duration-300 hover:scale-110 hover:bg-black hover:text-[#ea580c]">
          <h1 className="text-1xl mt-3 flex justify-center font-bold md:text-3xl">
            Team
          </h1>
          <p className="mt-0 md:mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            officiis eius omnis similique nisi aliquam tempore totam iusto enim
          </p>
        </div>
      </div>
      {/* <div className="p-4 space-y-2">
              <h4 className="font-semibold text-white line-clamp-2">{event.title}</h4>
              <p className="text-sm text-sky-400">{event.date}</p>
              <p className="text-sm text-orange-400">{event.price}</p>
              <p className="text-xs text-white/60 pt-2">by {event.author}</p>
            </div> */}
    </section>
  );
}
