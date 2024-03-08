import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { env } from "@/env.mjs";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path?: string): string {
  const siteUrl = env.NEXT_PUBLIC_APP_URL;
  if (!path) {
    return siteUrl;
  }
  return `${siteUrl}${path}`;
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(dateString: string): string {
  const targetDate = new Date(dateString);
  if (isNaN(targetDate.getTime())) {
    return "Invalid Date";
  }

  const now = new Date();
  const elapsedMs = now.getTime() - targetDate.getTime();

  const secondMs = 1000;
  const minuteMs = 60 * secondMs;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;
  const weekMs = 7 * dayMs;
  const monthMs = 30 * dayMs;
  const yearMs = 365 * dayMs;

  const formatTimeDifference = (value: number, unit: string) => {
    return value === 1 ? `1 ${unit} ago` : `${value} ${unit}s ago`;
  };

  if (elapsedMs >= yearMs) {
    return formatTimeDifference(Math.floor(elapsedMs / yearMs), "year");
  } else if (elapsedMs >= monthMs) {
    return formatTimeDifference(Math.floor(elapsedMs / monthMs), "month");
  } else if (elapsedMs >= weekMs) {
    return formatTimeDifference(Math.floor(elapsedMs / weekMs), "week");
  } else if (elapsedMs >= dayMs) {
    return formatTimeDifference(Math.floor(elapsedMs / dayMs), "day");
  } else if (elapsedMs >= hourMs) {
    return formatTimeDifference(Math.floor(elapsedMs / hourMs), "hour");
  } else if (elapsedMs >= minuteMs) {
    return formatTimeDifference(Math.floor(elapsedMs / minuteMs), "minute");
  } else {
    return elapsedMs <= secondMs
      ? "just now"
      : formatTimeDifference(Math.floor(elapsedMs / secondMs), "second");
  }
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function isString(value: any): value is string {
  return typeof value === "string";
}
