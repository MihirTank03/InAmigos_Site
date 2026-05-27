import Hero from '../sections/Hero';
import Impact from '../sections/Impact';
import Projects from '../sections/Projects';
import VolunteerCallout from '../sections/VolunteerCallout';

export default function Home() {
  return (
    <div className="w-full bg-[#fcf9f3]">
      <Hero />
      <Impact />
      <Projects />
      <VolunteerCallout />
    </div>
  );
}
