// import { Suspense } from "react";
// import EventBody from "./_components/EventBody";
// import EventHeader from "./_components/EventHeader";
// import Loading from "@/components/Loading";

// const EventDetail = async ({
//   params,
// }: {
//   params: Promise<{ objectId: string }>;
// }) => {
//   const objectId = (await params).objectId;
//   return (
//     <main className="container mx-auto px-4 pb-20">
//         <Suspense fallback={<Loading />}>
//       <EventHeader objectId={objectId} />
//       <EventBody objectId={objectId} />
//       </Suspense>
//     </main>
//   );
// };

// export default EventDetail;
