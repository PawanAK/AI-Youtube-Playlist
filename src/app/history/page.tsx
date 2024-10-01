import { LandingPageComponent } from "@/components/landing-page";
import { PlaylistHistory } from "@/components/PlaylistHistory";

export default function HistoryPage() {
  return (
    <div>
      <LandingPageComponent>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Your Playlist History
            </h1>
            <PlaylistHistory />
          </div>
        </section>
      </LandingPageComponent>
    </div>
  );
}