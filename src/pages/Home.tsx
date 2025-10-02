import { Hero } from '../components/Hero';
import { OurStory } from '../components/OurStory';
import { CateringServices } from '../components/CateringServices';
import { OurMenus } from '../components/OurMenus';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <OurStory />
      <CateringServices />
      <OurMenus />
      <Testimonials />
      <Contact />
    </>
  );
}
