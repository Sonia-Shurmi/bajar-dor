
"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getToday() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function getServerSnapshot() {
  return "";
}

export default function TodayDate() {
  const today = useSyncExternalStore(
    subscribe,
    getToday,
    getServerSnapshot
  );

  return <>{today || " "}</>;
}
