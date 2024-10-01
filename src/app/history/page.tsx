import { LandingPageComponent } from "@/components/landing-page";
import { PlaylistHistory } from "@/components/PlaylistHistory";

export default function HistoryPage() {
  return (
    <div>
      <LandingPageComponent>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
         
            <PlaylistHistory />
          </div>
        </section>
      </LandingPageComponent>
    </div>
  );
}