export interface Trip {
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

export const mockTrips: Trip[] = [
  {
    id: "1",
    name: "Paris Adventure",
    destination: "Paris, Franța",
    dates: "15-22 Iunie 2026",
    members: 6,
    image:
      "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlaWZmZWwlMjB0b3dlciUyMHBhcmlzJTIwZnJhbmNlfGVufDF8fHx8MTc3NDE5MDc4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "voting",
    votes: 24,
    attractions: 15,
  },
  {
    id: "2",
    name: "Summer in Greece",
    destination: "Santorini, Grecia",
    dates: "1-10 August 2026",
    members: 4,
    image:
      "https://images.unsplash.com/photo-1656504862966-2f0d002bae4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjBncmVlY2UlMjBzdW5zZXR8ZW58MXx8fHwxNzc0MjUzNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "planning",
    votes: 12,
    attractions: 8,
  },
  {
    id: "3",
    name: "Rome Explorer",
    destination: "Roma, Italia",
    dates: "5-12 Septembrie 2026",
    members: 5,
    image:
      "https://images.unsplash.com/photo-1698103182362-51abdc45d008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtJTIwaXRhbHl8ZW58MXx8fHwxNzc0MTc5NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    status: "confirmed",
    votes: 30,
    attractions: 20,
  },
];

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

export const mockItineraries: Record<string, ItineraryDay[]> = {
  "1": [
    {
      date: "15 Iunie 2026",
      day: 1,
      activities: [
        {
          id: "1",
          time: "09:00",
          name: "Turnul Eiffel",
          description: "Vizită la simbolul iconic al Parisului",
          duration: "2.5 ore",
          price: "€26",
          image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45",
          type: "attraction",
          location: "Champ de Mars",
        },
        {
          id: "2",
          time: "12:00",
          name: "Prânz la Café de l'Homme",
          description: "Restaurant cu vedere",
          duration: "1.5 ore",
          price: "€45",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
          type: "meal",
          location: "Trocadéro",
        },
      ],
    },
  ],
  "2": [
    {
      date: "1 August 2026",
      day: 1,
      activities: [
        {
          id: "3",
          time: "10:00",
          name: "Oia Village Tour",
          description: "Plimbare printre casele albe și domurile albastre",
          duration: "3 ore",
          price: "Gratuit",
          image: "https://images.unsplash.com/photo-1656504862966-2f0d002bae4c",
          type: "attraction",
          location: "Oia, Santorini",
        },
        {
          id: "4",
          time: "13:30",
          name: "Taverna Ammoudi",
          description: "Prânz cu fructe de mare pe malul apei",
          duration: "2 ore",
          price: "€35",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
          type: "meal",
          location: "Ammoudi Bay",
        }
      ],
    },
  ],
  "3": [
    {
      date: "5 Septembrie 2026",
      day: 1,
      activities: [
        {
          id: "5",
          time: "09:00",
          name: "Colosseum",
          description: "Explorarea amfiteatrului antic",
          duration: "2.5 ore",
          price: "€18",
          image: "https://images.unsplash.com/photo-1698103182362-51abdc45d008",
          type: "attraction",
          location: "Piazza del Colosseo",
        },
        {
          id: "6",
          time: "12:30",
          name: "Trattoria Romana",
          description: "Paste autentice italienești",
          duration: "1.5 ore",
          price: "€25",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
          type: "meal",
          location: "Monti",
        }
      ],
    }
  ]
};

// We will keep mockItinerary to avoid breaking older components momentarily, but point it to "1"
export const mockItinerary = mockItineraries["1"];

export interface Attraction {
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

export const mockAttractionsData: Record<string, Attraction[]> = {
  "1": [
    {
      id: "1",
      name: "Turnul Eiffel",
      description: "Simbolul iconic al Parisului",
      image: "https://images.unsplash.com/photo-1642947392578-b37fbd9a4d45",
      rating: 4.8,
      reviews: 25420,
      duration: "2-3 ore",
      price: "€26",
      category: "Monumente",
      votes: { up: 5, down: 1 },
      userVote: "up",
      saved: true,
    },
    {
      id: "2",
      name: "Muzeul Luvru",
      description: "Cel mai mare muzeu de artă din lume",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
      rating: 4.7,
      reviews: 18950,
      duration: "3-4 ore",
      price: "€17",
      category: "Muzee",
      votes: { up: 4, down: 0 },
      userVote: "up",
      saved: true,
    }
  ],
  "2": [
    {
      id: "3",
      name: "Oia Sunset View",
      description: "Cel mai faimos loc pentru apusuri din Santorini",
      image: "https://images.unsplash.com/photo-1656504862966-2f0d002bae4c",
      rating: 4.9,
      reviews: 15420,
      duration: "1-2 ore",
      price: "Gratuit",
      category: "Peisaje",
      votes: { up: 8, down: 0 },
      userVote: "up",
      saved: true,
    },
    {
      id: "4",
      name: "Red Beach",
      description: "Plajă spectaculoasă cu nisip și stânci roșii",
      image: "https://images.unsplash.com/photo-1570077188670-e3a5d69ad55b",
      rating: 4.6,
      reviews: 8950,
      duration: "3-4 ore",
      price: "Gratuit",
      category: "Plaje",
      votes: { up: 4, down: 1 },
      userVote: null,
      saved: false,
    }
  ],
  "3": [
    {
      id: "5",
      name: "Colosseum",
      description: "Amfiteatrul iconic al Imperiului Roman",
      image: "https://images.unsplash.com/photo-1698103182362-51abdc45d008",
      rating: 4.9,
      reviews: 45420,
      duration: "2-3 ore",
      price: "€18",
      category: "Istorie",
      votes: { up: 12, down: 0 },
      userVote: "up",
      saved: true,
    },
    {
      id: "6",
      name: "Fontana di Trevi",
      description: "Cea mai mare și celebră fântână barocă din Roma",
      image: "https://images.unsplash.com/photo-1542820229-081e0c12af0b",
      rating: 4.8,
      reviews: 38950,
      duration: "1 oră",
      price: "Gratuit",
      category: "Monumente",
      votes: { up: 9, down: 0 },
      userVote: null,
      saved: false,
    }
  ]
};

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  senderName?: string;
  time: string;
  sharedAttractionId?: string;
}

export const mockMessagesData: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Hei, abia aștept să plecăm în Paris!", sender: "other", senderName: "Ana", time: "10:30" },
    { id: "2", text: "Da, și eu! Ai găsit cazare?", sender: "me", time: "10:32" },
    { id: "3", text: "Încă mă uit pe Airbnb. Vă trimit linkuri diseară.", sender: "other", senderName: "Alex", time: "10:45" },
  ],
  "2": [
    { id: "1", text: "Salutare! Trebuie să ne hotărâm la activități pentru Santorini.", sender: "other", senderName: "Maria", time: "09:00" },
  ],
  "3": [
    { id: "1", text: "Pizza în prima zi?", sender: "me", time: "12:00" },
    { id: "2", text: "Clar!", sender: "other", senderName: "Ion", time: "12:05" },
  ]
};

export const addChatMessage = (tripId: string, message: Message) => {
  if (!mockMessagesData[tripId]) {
    mockMessagesData[tripId] = [];
  }
  mockMessagesData[tripId].push(message);
};

export const updateItineraryActivity = (tripId: string, dayIndex: number, activityId: string, updatedData: Partial<Activity>) => {
  const day = mockItineraries[tripId]?.[dayIndex];
  if (day) {
    const activityIndex = day.activities.findIndex(a => a.id === activityId);
    if (activityIndex !== -1) {
      day.activities[activityIndex] = { ...day.activities[activityIndex], ...updatedData };
    }
  }
};

export const deleteItineraryActivity = (tripId: string, dayIndex: number, activityId: string) => {
  const day = mockItineraries[tripId]?.[dayIndex];
  if (day) {
    day.activities = day.activities.filter(a => a.id !== activityId);
  }
};

export const deleteItineraryDay = (tripId: string, dayIndex: number) => {
  if (mockItineraries[tripId]) {
    mockItineraries[tripId].splice(dayIndex, 1);
  }
};

export const addTrip = (trip: Trip) => {
  mockTrips.unshift(trip);
  mockItineraries[trip.id] = [];
};

export const deleteTrip = (id: string) => {
  const index = mockTrips.findIndex(t => t.id === id);
  if (index !== -1) {
    mockTrips.splice(index, 1);
    delete mockItineraries[id];
  }
};

// In store.ts, asigura-te ca ai functia asta exportata:
export const addItineraryActivity = (tripId: string, dayIndex: number, activity: Activity) => {
  if (mockItineraries[tripId] && mockItineraries[tripId][dayIndex]) {
    mockItineraries[tripId][dayIndex].activities.push(activity);
  } else {
    console.error("Trip sau zi inexistenta in itinerariu");
  }
};
