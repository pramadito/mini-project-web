import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "LAJUR PACU",
    date: "11 Feb 2026 - 13 Feb 2026",
    price: "Rp 1.000.000",
    img: "/pacu.webp",
    location: "Beach City International Stadium",
  },
  {
    id: 2,
    title: "MARATHON RUNNING",
    date: "31 Mar 2026 - 01 Apr 2026",
    price: "Rp 100.000",
    img: "/marathon.webp",
    location: "Beach City International Stadium",
  },
  {
    id: 3,
    title: "BADMINTON",
    date: "31 Mar 2026 - 01 Apr 2026",
    price: "Rp 200.000",
    img: "/badminton.webp",
    location: "Beach City International Stadium",
  },
  {
    id: 4,
    title: "MINI SOCCER",
    date: "31 Mar 2026 - 01 Apr 2026",
    price: "Rp 500.000",
    img: "/minsoc.webp",
    location: "Beach City International Stadium",
  },


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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative h-[300px] overflow-hidden rounded-lg"
          >
           <Image
              src={event.img}
              alt={event.title}
              fill  
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-sm">{event.date}</p>
              <p className="text-sm">{event.price}</p>
              <p className="text-xs pt-2">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
     
   
      {/* <div className="p-4 space-y-2">
              <h4 className="font-semibold text-white line-clamp-2">{event.title}</h4>
              <p className="text-sm text-sky-400">{event.date}</p>
              <p className="text-sm text-orange-400">{event.price}</p>
              <p className="text-xs">{event.location}</p>
            </div> */}
    </section>
  );
}
