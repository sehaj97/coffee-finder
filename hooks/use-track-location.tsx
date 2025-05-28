"use client";

import { useState } from "react";

function useTrackLocation() {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const trackLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setLocation({ latitude: coords.latitude, longitude: coords.longitude }),
      () => {}
    );
  };

  return { location, trackLocation };
}

export default useTrackLocation;
