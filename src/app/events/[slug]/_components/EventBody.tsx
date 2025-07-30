import { FC } from "react";
import { getEvent } from "../_api/get-event";
import Markdown from "@/components/Markdown";

interface EventBodyProps {
  slug: string;
}

const EventBody: FC<EventBodyProps> = async ({slug}) => {
  const event = await getEvent(slug);
  return (
    <section className="mt-8">
      <Markdown content={event.description} />
    </section>
  );
};

export default EventBody;
