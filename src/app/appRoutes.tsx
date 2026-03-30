import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { TripPlanning } from "./pages/TripPlanning";
import { Explore } from "./pages/Explore";
import { Itinerary } from "./pages/Itinerary";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import { SavedAttractions } from "./pages/SavedAttractions";
import { Settings } from "./pages/Settings";
import { NewTrip } from "./pages/NewTrip";
import { Notifications } from "./pages/Notifications";
import { TripChat } from "./pages/TripChat";
import { Auth } from "./pages/Auth";
import { Root } from "./Root";
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
      { path: "trip/:id", Component: TripPlanning },
      { path: "explore/:id", Component: Explore },
      { path: "itinerary/:id", Component: Itinerary },
      { path: "chat/:id", Component: TripChat },
      { path: "profile", Component: Profile },
      { path: "edit-profile", Component: EditProfile },
      { path: "saved-attractions", Component: SavedAttractions },
      { path: "settings", Component: Settings },
      { path: "new-trip", Component: NewTrip },
      { path: "notifications", Component: Notifications },
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