import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import { Loader2 } from "lucide-react";

// --- 1. IMPORTURI INSTANTE (Core Flow - FĂRĂ LAZY) ---
// Aceste pagini sunt "inima" aplicației și trebuie să fie disponibile la 0ms latență.
import { Root } from "./Root";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { TripPlanning } from "./pages/TripPlanning";
import { Explore } from "./pages/Explore";
import { Itinerary } from "./pages/Itinerary";
import { TripChat } from "./pages/TripChat";
import { NewTrip } from "./pages/NewTrip";

// --- 2. DEFINIRE PAGINI LAZY (Paginile secundare/setări) ---
// Acestea rămân lazy pentru că nu sunt accesate la fel de des.
const SavedAttractions = () => import("./pages/SavedAttractions").then(m => ({ default: m.SavedAttractions }));
const Settings = () => import("./pages/Settings").then(m => ({ default: m.Settings }));
const Notifications = () => import("./pages/Notifications").then(m => ({ default: m.Notifications }));
const EditProfile = () => import("./pages/EditProfile").then(m => ({ default: m.EditProfile }));
const TripSettings = () => import("./pages/TripSettings").then(m => ({ default: m.TripSettings }));
const ManageMembers = () => import("./pages/ManageMembers").then(m => ({ default: m.ManageMembers }));
const InvitationPermissions = () => import("./pages/InvitationPermissions").then(m => ({ default: m.InvitationPermissions }));
const PrivacySettings = () => import("./pages/PrivacySettings").then(m => ({ default: m.PrivacySettings }));
const ChangeDestination = () => import("./pages/ChangeDestination").then(m => ({ default: m.ChangeDestination }));
const VoteNotifications = () => import("./pages/VoteNotifications").then(m => ({ default: m.VoteNotifications }));
const LockItinerary = () => import("./pages/LockItinerary").then(m => ({ default: m.LockItinerary }));
const HideItinerary = () => import("./pages/HideItinerary").then(m => ({ default: m.HideItinerary }));

// Componente Lazy wrap-uite
const LazySavedAttractions = lazy(SavedAttractions);
const LazySettings = lazy(Settings);
const LazyNotifications = lazy(Notifications);
const LazyEditProfile = lazy(EditProfile);
const LazyTripSettings = lazy(TripSettings);
const LazyManageMembers = lazy(ManageMembers);
const LazyInvitationPermissions = lazy(InvitationPermissions);
const LazyPrivacySettings = lazy(PrivacySettings);
const LazyChangeDestination = lazy(ChangeDestination);
const LazyVoteNotifications = lazy(VoteNotifications);
const LazyLockItinerary = lazy(LockItinerary);
const LazyHideItinerary = lazy(HideItinerary);

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-blue-600">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
);

// Helper pentru paginile care rămân lazy
const Loadable = (Component: React.ComponentType) => (props: any) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);

export const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // PAGINI INSTANTE
      { index: true, Component: Home },
      { path: "profile", Component: Profile },
      { path: "new-trip", Component: NewTrip },
      { path: "trip/:id", Component: TripPlanning },
      { path: "explore/:id", Component: Explore },
      { path: "itinerary/:id", Component: Itinerary },
      { path: "chat/:id", Component: TripChat },

      // PAGINI CU LOAD (Setări și altele)
      { path: "edit-profile", Component: Loadable(LazyEditProfile) },
      { path: "saved-attractions", Component: Loadable(LazySavedAttractions) },
      { path: "settings", Component: Loadable(LazySettings) },
      { path: "notifications", Component: Loadable(LazyNotifications) },
      { path: "trip/:id/trip-settings", Component: Loadable(LazyTripSettings) },
      { path: "manage-members/:id", Component: Loadable(LazyManageMembers) },
      { path: "invitation-permissions/:id", Component: Loadable(LazyInvitationPermissions) },
      { path: "privacy-settings/:id", Component: Loadable(LazyPrivacySettings) },
      { path: "change-destination/:id", Component: Loadable(LazyChangeDestination) },
      { path: "vote-notifications/:id", Component: Loadable(LazyVoteNotifications) },
      { path: "lock-itinerary/:id", Component: Loadable(LazyLockItinerary) },
      { path: "hide-itinerary/:id", Component: Loadable(LazyHideItinerary) },
    ],
  },
  {
    path: "/login",
    Component: Auth,
  },
]);