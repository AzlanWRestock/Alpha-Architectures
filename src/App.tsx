/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState} from 'react';
import {AboutSection} from './components/AboutSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {Navbar} from './components/Navbar';
import {ProcessSection} from './components/ProcessSection';
import {ProjectsSection} from './components/ProjectsSection';
import {ServicesSection} from './components/ServicesSection';
import {WhyChooseSection} from './components/WhyChooseSection';
import {ProjectItem, SITE_CONFIG} from './data/siteConfig';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>(
    SITE_CONFIG.services[0].title,
  );
  const [preselectedNote, setPreselectedNote] = useState<string>('');

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleRequestConsultation = () => {
    scrollToSection('#contact');
  };

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setPreselectedNote(
      `I would like to request a consultation regarding ${serviceTitle}.`,
    );
    scrollToSection('#contact');
  };

  const handleInquireProject = (project: ProjectItem) => {
    const matchingService =
      project.category === 'Residential'
        ? 'Residential Construction'
        : project.category === 'Commercial'
          ? 'Commercial Construction'
          : project.category === 'Renovation'
            ? 'Renovation & Remodeling'
            : 'Property Development';

    setPreselectedService(matchingService);
    setPreselectedNote(
      `I am interested in discussing a project with a similar architectural scope to "${project.title}" (${project.category}).`,
    );
    scrollToSection('#contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#0B1B3B]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#0B1B3B] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar onRequestConsultation={handleRequestConsultation} />

      <main id="main-content" className="flex-1">
        <HeroSection
          onExploreProjects={() => scrollToSection('#projects')}
          onRequestConsultation={handleRequestConsultation}
        />

        <AboutSection />

        <ServicesSection onSelectService={handleSelectService} />

        <ProjectsSection onInquireProject={handleInquireProject} />

        <WhyChooseSection />

        <ProcessSection />

        <ContactSection
          preselectedService={preselectedService}
          preselectedNote={preselectedNote}
        />
      </main>

      <Footer />
    </div>
  );
}
