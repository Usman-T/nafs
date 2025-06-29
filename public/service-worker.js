import { buildSW } from "serwist/sw";

buildSW({
  routes: [
    {
      match: ({ url }) => url.pathname.startsWith("/onboarding"),
      handler: "networkOnly",
    },
    {
      match: ({ request, url }) =>
        request.destination === "document" &&
        !url.pathname.startsWith("/onboarding"),
      handler: "networkFirst",
      options: {
        cacheName: "html-pages-v1",
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
    {
      match: ({ request }) =>
        ["style", "script", "font", "image"].includes(request.destination),
      handler: "cacheFirst",
      options: {
        cacheName: "static-assets-v1",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      match: ({ url }) => url.pathname.startsWith("/api/"),
      handler: "networkOnly",
    },
  ],
});
