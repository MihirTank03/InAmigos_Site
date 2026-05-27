export default function FieldStories() {
  return (
    <section className="w-full bg-surface py-space-xl scroll-mt-28" id="about">
      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              Unfiltered Field Truths
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-primary mt-1">
              Voices of Reclaimed Dignity
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-2 md:mt-0">
            Real, unfiltered stories of lives transformed through quiet dignity and community compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Card 1: BachpanShala */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col border border-outline-variant/20">
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="BachpanShala Village Classroom"
                src="https://inamigosfoundation.org.in/public/storage/gallery/1743051438.jpg"
                onError={(e) => {
                  e.currentTarget.src = '/images/slide-2.jpg';
                }}
              />
              <span className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-xs px-2.5 py-1 rounded-md font-semibold">
                BachpanShala
              </span>
            </div>
            <div className="p-space-md flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-secondary mb-space-xs">
                  <span className="material-symbols-outlined text-base">format_quote</span>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
                    Rural Education
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg sm:text-headline-sm text-primary mb-space-xs tracking-tight font-bold">
                  "Education transformed our village square into a hub of joy."
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  4,500+ children receiving vernacular literacy, weekend study circles, and learning kits.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm bg-surface-container-low -mx-space-md -mb-space-md p-space-sm flex items-center justify-between border-t border-outline-variant/20">
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Pooja &amp; Learners
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    Sipat Rural Cluster
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-semibold">
                  Education Hub
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Project Jeev */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col border border-outline-variant/20">
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="Project Jeev Volunteer Feeding Stray Dogs"
                src="https://inamigosfoundation.org.in/public/storage/gallery/1743051466.jpg"
                onError={(e) => {
                  e.currentTarget.src = '/images/slide-4.jpg';
                }}
              />
              <span className="absolute top-4 left-4 bg-secondary text-on-secondary font-label-sm text-xs px-2.5 py-1 rounded-md font-semibold">
                Project Jeev
              </span>
            </div>
            <div className="p-space-md flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-secondary mb-space-xs">
                  <span className="material-symbols-outlined text-base">format_quote</span>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
                    Animal Welfare
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg sm:text-headline-sm text-primary mb-space-xs tracking-tight font-bold">
                  "No stray should suffer hunger, cold rain, or trauma."
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  Daily meal drives for 50+ animals, anti-rabies inoculations, water bowl setups, and rain rescues.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm bg-surface-container-low -mx-space-md -mb-space-md p-space-sm flex items-center justify-between border-t border-outline-variant/20">
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Sneha &amp; Rescue Team
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    Project Jeev Network
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-semibold">
                  Active Drive
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Amigos LEVELUP */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col border border-outline-variant/20">
            <div className="relative h-48 sm:h-52 overflow-hidden">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                alt="Amigos LEVELUP Youth Leadership"
                src="https://inamigosfoundation.org.in/public/storage/gallery/1743051449.jpg"
                onError={(e) => {
                  e.currentTarget.src = '/images/volunteer-1.jpg';
                }}
              />
              <span className="absolute top-4 left-4 bg-primary-container text-on-primary-container font-label-sm text-xs px-2.5 py-1 rounded-md font-semibold">
                Amigos LEVELUP
              </span>
            </div>
            <div className="p-space-md flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-secondary mb-space-xs">
                  <span className="material-symbols-outlined text-base">format_quote</span>
                  <span className="font-label-sm text-xs font-bold uppercase tracking-wider">
                    Youth Mentorship
                  </span>
                </div>
                <h3 className="font-headline-sm text-lg sm:text-headline-sm text-primary mb-space-xs tracking-tight font-bold">
                  "Empowering 30,000+ interns with real social leadership."
                </h3>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  Hands-on mentorship in digital outreach, data operations, community impact, and career skills.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm bg-surface-container-low -mx-space-md -mb-space-md p-space-sm flex items-center justify-between border-t border-outline-variant/20">
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Kavita Verma
                  </span>
                  <span className="font-label-sm text-xs text-on-surface-variant">
                    LEVELUP Lead Mentor
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-xs font-semibold">
                  Youth Lead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
