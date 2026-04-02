import { createBrowserRouter } from "react-router";

// --- Toate importurile sunt acum statice (Instantanee) ---
import { Root } from "./Root";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { TripPlanning } from "./pages/TripPlanning";
import { Explore } from "./pages/Explore";
import { Itinerary } from "./pages/Itinerary";
import { TripChat } from "./pages/TripChat";
import { NewTrip } from "./pages/NewTrip";
import { SplashScreen } from "./components/SplashScreen";
import { Navigation } from "./components/Navigation";
import { Notifications } from "./pages/Notifications";

// Importăm restul paginilor care înainte erau lazy
import { SavedAttractions } from "./pages/SavedAttractions";
import { Settings } from "./pages/Settings";
import { EditProfile } from "./pages/EditProfile";
import { TripSettings } from "./pages/TripSettings";
import { ManageMembers } from "./pages/ManageMembers";
import { InvitationPermissions } from "./pages/InvitationPermissions";
import { PrivacySettings } from "./pages/PrivacySettings";
import { ChangeDestination } from "./pages/ChangeDestination";
import { VoteNotifications } from "./pages/VoteNotifications";
import { LockItinerary } from "./pages/LockItinerary";
import { HideItinerary } from "./pages/HideItinerary";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "profile", Component: Profile },
      { path: "new-trip", Component: NewTrip },
      { path: "trip/:id", Component: TripPlanning },
      { path: "explore/:id", Component: Explore },
      { path: "itinerary/:id", Component: Itinerary },
      { path: "chat/:id", Component: TripChat },
      { path: "notifications", Component: Notifications },
      { path: "splash", Component: SplashScreen },
      { path: "navigation", Component: Navigation },
      
      // Paginile de setări și profil (acum se încarcă fără întârziere)
      { path: "edit-profile", Component: EditProfile },
      { path: "saved-attractions", Component: SavedAttractions },
      { path: "settings", Component: Settings },
      { path: "trip/:id/trip-settings", Component: TripSettings },
      { path: "manage-members/:id", Component: ManageMembers },
      { path: "invitation-permissions/:id", Component: InvitationPermissions },
      { path: "privacy-settings/:id", Component: PrivacySettings },
      { path: "change-destination/:id", Component: ChangeDestination },
      { path: "vote-notifications/:id", Component: VoteNotifications },
      { path: "lock-itinerary/:id", Component: LockItinerary },
      { path: "hide-itinerary/:id", Component: HideItinerary },
    ],
  },
  {
    path: "/login",
    Component: Auth,
  },
]);