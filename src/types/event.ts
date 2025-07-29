export interface Event {
  id: number
  slug: string
  title: string
  thumbnail: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  organizerId: number
  totalSeats: number
  availableSeats: number
  price: number
  category: string
  imageUrl: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date

}

