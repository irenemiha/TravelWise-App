import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { appRouter } from "./appRoutes";
import { SplashScreen } from "./components/SplashScreen"; // Asigură-te că ai această pagină

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // onAuthStateChanged este "gardianul" care ne spune dacă userul e logat
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Firebase Auth s-a inițializat.");
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  if (isInitializing) {
    return <SplashScreen />; // Aici se va opri aplicația până când Firebase dă un răspuns
  }

  return <RouterProvider router={appRouter} />;
}