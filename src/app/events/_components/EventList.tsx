"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetEvents from "../_hooks/useGetEvents";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: events, isPending } = useGetEvents({
    page,
    search: debounceSearch,
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center  gap-4 mb-8 mt-12">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full sm:max-w-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="double">Double</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

     
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isPending && <EventCardSkeleton count={3} />}

        {events?.data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      {/* Pagination */}
      {events && (
        <div className="mt-12">
          <PaginationSection meta={events.meta} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default EventList;
