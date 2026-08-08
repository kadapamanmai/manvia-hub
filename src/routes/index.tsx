import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The MANVIA site is a standalone HTML/CSS/JS build served from /manvia/.
// "/" redirects there so the app opens on the site home page.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MANVIA — Move Better. Feel Stronger. Live Better." },
      {
        name: "description",
        content:
          "MANVIA is a premium fitness and wellness platform with smart workouts, balanced nutrition, expert trainers and progress tracking.",
      },
      { property: "og:title", content: "MANVIA — Move Better. Feel Stronger. Live Better." },
      {
        property: "og:description",
        content: "Smarter workouts, balanced nutrition, expert guidance and progress tracking — all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/manvia/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">MANVIA</h1>
        <p className="mt-2 text-sm text-muted-foreground">Move Better. Feel Stronger. Live Better.</p>
        <a
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          href="/manvia/index.html"
        >
          Enter MANVIA
        </a>
      </div>
    </div>
  );
}
