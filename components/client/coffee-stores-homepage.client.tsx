"use client";

import { useEffect, useState } from "react";
import Banner from "./top-banner.client";
import InfoCardList from "./info-card-list.client";
import useTrackLocation from "@/hooks/use-track-location";

const DEFAULT_LOCATION = {
  longitude: -73.990593,
  latitude: 40.740121,
};

export default function CoffeeStoresHomePage() {
  const { loading, location, trackLocation } = useTrackLocation();
  const [currentLocation, setCurrentLocation] = useState(location);
  const [showLocal, setShowLocal] = useState(false);

  const clearSessionLocation = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes(",")) sessionStorage.removeItem(key);
    });
    sessionStorage.removeItem("locationSessionKey");
  };

  const handleOnClick = () => {
    setShowLocal(true);
    clearSessionLocation();
    trackLocation();
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("locationSessionKey");
    if (stored) {
      const { latitude, longitude } = JSON.parse(stored);
      setCurrentLocation({ latitude, longitude });
    } else {
      sessionStorage.setItem("locationSessionKey", JSON.stringify(location));
      if (location.latitude && location.longitude) {
        setCurrentLocation(location);
      }
    }
  }, [location]);

  return (
    <main className="flex flex-col items-center justify-center p-6">
      <Banner
        buttonText={loading ? "Loading..." : "View Your Local Coffee Shops"}
        handleClick={handleOnClick}
      />
      {showLocal && (
        <InfoCardList
          location={currentLocation}
          headingText="Your Local Coffee Shops"
          limit={10}
        />
      )}
      <InfoCardList
        location={DEFAULT_LOCATION}
        headingText="New York Coffee Shops"
      />
    </main>
  );
}
