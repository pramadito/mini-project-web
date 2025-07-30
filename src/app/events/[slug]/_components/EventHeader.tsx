// import { FC } from "react";
// import { getEvent } from "../_api/get-event";
// import { Badge } from "@/components/ui/badge";
// import { format } from "date-fns";
// import Image from "next/image";

// interface EventHeaderProps {
//   objectId: string;
// }

// const EventHeader: FC<EventHeaderProps> = async ({ objectId }) => {
//   const event = await getEvent(objectId);

//   return (
//     <section className="space-y-2">
//       <Badge variant="outline" className="bg-green-100 capitalize">
//         {event.category}
//       </Badge>
//       <h1 className="text-4xl font-bold">{event.title}</h1>

//       <p className="font-extralight">
//         {format(new Date(event.createdAt), "dd MMMM yyyy")}
//       </p>
//       <div className="relative w-full h-[360px]">
//         <Image
//           src={event.thumbnail}
//           alt="thumbnail"
//           className="object-cover"
//           fill
//         />
//       </div>
//     </section>
//   );
// };

// export default EventHeader;
