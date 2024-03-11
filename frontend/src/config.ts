import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "ar"] as const;

export const pathnames = {
  "/": "/",
  "/create": "/create",
  "/my-pages": "/my-pages",
  "/signin": "/signin",
  "/signup": "/signup",
  "/league/[leagueSlug]": "/league/[leagueSlug]",
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "as-needed";

export type AppPathnames = keyof typeof pathnames;
