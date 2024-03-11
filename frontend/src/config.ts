import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "ar"] as const;

export const pathnames = {
  "/": "/",
  "/create": "/create",
  "/my-pages": "/my-pages",
  "/signin": "/signin",
  "/signup": "/signup",
  "/matches-table": "/matches-table",
  "/league/[leagueSlug]": "/league/[leagueSlug]",
  "/league/[leagueSlug]/schedule": "/league/[leagueSlug]/schedule"
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "as-needed";

export type AppPathnames = keyof typeof pathnames;
