"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Users, Ticket, MapPin, Edit, BarChart, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SportEvent {
  id: number;
  title: string;
  sportType: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  totalSeats: number;
  availableSeats: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  imageUrl: string | null;
  teams?: {
    name: string;
    logo?: string;
  }[];
}

export default function ManageSportEventsPage() {
  const [sportEvents, setSportEvents] = useState<SportEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        const mockEvents: SportEvent[] = [
          {
            id: 1,
            title: "Annual Football Championship",
            sportType: "Football",
            description: "Inter-university football tournament finals",
            location: "National Stadium",
            startDate: "2024-07-15T15:00:00.000Z",
            endDate: "2024-07-15T17:30:00.000Z",
            totalSeats: 5000,
            availableSeats: 1250,
            status: "upcoming",
            imageUrl: null,
            teams: [
              { name: "State University", logo: "SU" },
              { name: "Tech Institute", logo: "TI" }
            ]
          },
          // ... other events
        ];
        setSportEvents(mockEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sport Events</h2>
          <p className="text-muted-foreground">
            Manage all your sport competitions and tournaments
          </p>
        </div>
        <Button asChild className="flex items-center gap-2">
          <Link href="/sport-events/new">
            <Plus className="h-4 w-4" />
            New Sport Event
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sportEvents.map((event) => {
          const bookedPercentage = event.totalSeats > 0 
            ? Math.round(((event.totalSeats - event.availableSeats) / event.totalSeats) * 100)
            : 0;
            
          const isFreeEvent = event.totalSeats === 0;
          const isSoldOut = !isFreeEvent && event.availableSeats === 0;

          return (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge
                        variant={
                          event.status === "upcoming"
                            ? "secondary"
                            : event.status === "ongoing"
                              ? "default"
                              : event.status === "completed"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs capitalize"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <CardDescription className="mt-1 text-sm font-medium text-primary">
                      {event.sportType}
                    </CardDescription>
                    <CardDescription className="mt-2 line-clamp-2">
                      {event.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/sport-events/${event.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Teams/Participants */}
                {event.teams && (
                  <div className="flex items-center gap-3">
                    {event.teams.map((team, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {team.logo || team.name.charAt(0)}
                        </div>
                        <span className="text-sm">{team.name}</span>
                        {index < event.teams!.length - 1 && (
                          <span className="text-muted-foreground">vs</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Date and Location */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(event.startDate)} • {formatTime(event.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate max-w-[100px]">{event.location}</span>
                  </div>
                </div>

                {/* Ticket Status */}
                {!isFreeEvent && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tickets</span>
                      <span className="text-sm font-medium">
                        {isSoldOut ? (
                          <Badge variant="destructive">Sold Out</Badge>
                        ) : (
                          `${event.totalSeats - event.availableSeats}/${event.totalSeats} sold`
                        )}
                      </span>
                    </div>
                    <Progress value={bookedPercentage} className="h-2" />
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/sport-events/${event.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/sport-events/${event.id}/participants`}>
                      <Users className="h-4 w-4 mr-2" />
                      {event.teams ? 'Teams' : 'Participants'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}