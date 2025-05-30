"use client";

import { useEffect, useState } from "react";
import Banner from "./top-banner.client";
import InfoCardList from "./info-card-list.client";
import useTrackLocation from "@/hooks/use-track-location";

export default function CoffeePageParent() {
  const { loading, location, trackLocation } = useTrackLocation();
  const [currentLocation, setCurrentLocation] = useState(location);

  const handleOnClick = () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes(",")) {
        sessionStorage.removeItem(key);
      }
    });
    sessionStorage.removeItem("locationSessionKey");
    trackLocation();
  };

  useEffect(() => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes(",")) {
        sessionStorage.removeItem(key);
      }
    });
    sessionStorage.removeItem("locationSessionKey");
    trackLocation();
  }, []);

  useEffect(() => {
    // Sync local state with hook's location

    Object.keys(sessionStorage).forEach((key) => {
      if (key.includes(",")) {
        sessionStorage.removeItem(key);
      }
    });
    const isLocationSessionKeyExist =
      sessionStorage.getItem("locationSessionKey");
    if (isLocationSessionKeyExist) {
      const storedLocation = JSON.parse(
        sessionStorage.getItem("locationSessionKey") || "{}"
      );
      setCurrentLocation({
        latitude: storedLocation.latitude,
        longitude: storedLocation.longitude,
      });
      console.log(
        "Using stored location from sessionStorage:",
        currentLocation
      );
    } else {
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
      <InfoCardList location={currentLocation} />
    </main>
  );
}
