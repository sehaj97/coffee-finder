"use client";

import { useState } from "react";

function useTrackLocation() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    longitude: -73.990593,
    latitude: 40.740121,
  });

  const [loading, setLoading] = useState(false);

  const trackLocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    console.log("Tracking location...");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setLoading(false);
      },
      () => {
        setLocation({
          longitude: -73.990593,
          latitude: 40.740121,
        });
        setLoading(false);
      }
    );
  };

  return { location, loading, trackLocation };
}

export default useTrackLocation;
