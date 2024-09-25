/**
 * Summary: Converts an ISO 8601 date string to a formatted 'YYYY/MM/DD' string.
 * @copyright Copyright (c) 2024 CentrSeal. All rights reserved.
 * @file This file defines the `useFormattedDate` composable.
 * @author Kasra Jannati
 */

export function useFormattedDate() {
  const formatDate = (isoDate: string | undefined) => {
    if (!isoDate) {
      return;
    }
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return {
    formatDate,
  };
}
