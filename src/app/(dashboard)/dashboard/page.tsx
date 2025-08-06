"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Ticket,
  Users,
  DollarSign,
  Edit,
  BarChart,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  organizerId: number;
  totalSeats: number;
  availableSeats: number;
  category: string;
  imageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DashboardPageProps {
  events?: {
    data: Event[];
    meta: {
      page: number;
      take: number;
      total: number;
    };
  };
  isLoading?: boolean;
}

export default function DashboardPage({ events, isLoading = false }: DashboardPageProps) {
  // Provide default values if events is undefined
  const safeEvents = events || { 
    data: [], 
    meta: { 
      page: 1, 
      take: 0, 
      total: 0 
    } 
  };

  // Calculate statistics from events data
  const totalEvents = safeEvents.meta.total;
  const publishedEvents = safeEvents.data.filter(event => event.isPublished).length;
  const upcomingEvents = safeEvents.data.filter(event => 
    new Date(event.startDate) > new Date()
  ).length;
  const totalSeats = safeEvents.data.reduce((sum, event) => sum + event.totalSeats, 0);
  const availableSeats = safeEvents.data.reduce((sum, event) => sum + event.availableSeats, 0);
  const bookedSeats = totalSeats - availableSeats;
  
  const revenue = safeEvents.data.reduce((sum, event) => {
    return sum + (bookedSeats * 50); // Example: $50 per ticket
  }, 0);

  const stats = [
    {
      title: "Total Events",
      value: totalEvents,
      icon: Calendar,
      description: `${publishedEvents} published`,
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents,
      icon: Clock,
      description: "Scheduled",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Revenue",
      value: `$${revenue.toLocaleString()}`,
      icon: DollarSign,
      description: "All time",
      trend: "up",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Tickets Sold",
      value: bookedSeats,
      icon: Ticket,
      description: `${availableSeats} available`,
      trend: "up",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Organizer Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage your events and track your performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="group hover:shadow-lg transition-all duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Content Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Events Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold">
                  Recent Events
                </CardTitle>
                <p className="text-muted-foreground">
                  Your most recent events
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/events/new">Create New</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {safeEvents.data.length > 0 ? (
              safeEvents.data.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${event.isPublished ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.startDate).toLocaleDateString()} • {event.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/events/${event.id}/edit`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="flex items-center">
                        <Ticket className="h-4 w-4 mr-1" />
                        {event.availableSeats} / {event.totalSeats} seats
                      </span>
                      <span className="flex items-center">
                        {event.isPublished ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Published
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 mr-1 text-yellow-500" />
                            Draft
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No events found</p>
                <Button className="mt-4" asChild>
                  <Link href="/events/new">Create your first event</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Quick Actions
            </CardTitle>
            <p className="text-muted-foreground">Manage your events</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                <Link href="/events/new">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm font-medium">Create Event</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                <Link href="/events">
                  <Ticket className="h-6 w-6" />
                  <span className="text-sm font-medium">Manage Events</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                <Link href="/transactions">
                  <DollarSign className="h-6 w-6" />
                  <span className="text-sm font-medium">Transactions</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
                <Link href="/analytics">
                  <BarChart className="h-6 w-6" />
                  <span className="text-sm font-medium">Analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Upcoming Events
          </CardTitle>
          <p className="text-muted-foreground">
            Events happening soon
          </p>
        </CardHeader>
        <CardContent>
          {safeEvents.data.filter(event => new Date(event.startDate) > new Date()).length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {safeEvents.data
                .filter(event => new Date(event.startDate) > new Date())
                .map(event => (
                  <Card key={event.id} className="hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Ticket className="h-4 w-4" />
                        {event.availableSeats} seats available
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/events/${event.id}`}>Manage Event</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming events</p>
              <Button className="mt-4" asChild>
                <Link href="/events/new">Create a new event</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}