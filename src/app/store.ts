export interface Trip {
  itinerary: any;
  id: string;
  name: string;
  destination: string;
  dates: string;
  members: number;
  image: string;
  status: "planning" | "voting" | "confirmed";
  votes: number;
  attractions: number;
}

export interface Activity {
  id: string;
  time: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  type: "attraction" | "meal" | "transport" | "break";
  location: string;
}

export interface ItineraryDay {
  date: string;
  day: number;
  activities: Activity[];
}

export interface Attraction {
  location: any;
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  price: string;
  category: string;
  votes: { up: number; down: number };
  userVote: "up" | "down" | null;
  saved: boolean;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  senderName?: string;
  timestamp: string;
  sharedAttractionId?: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt: any;
  savedAttractions: string[];
}
