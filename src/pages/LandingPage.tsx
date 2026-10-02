import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { FeatureOverview } from '../components/landing/FeatureOverview';
import { WhyRyncode } from '../components/landing/WhyRyncode';
import { Timeline } from '../components/landing/Timeline';
import { Services } from '../components/landing/Services';
import { Portfolio } from '../components/landing/Portfolio';
import { PartnerSlider } from '../components/landing/PartnerSlider';
import { TestimonialSlider } from '../components/landing/TestimonialSlider';
import { Faq } from '../components/landing/Faq';
import { ContactForm } from '../components/landing/ContactForm';
import { Footer } from '../components/landing/Footer';
import { FloatingWhatsApp } from '../components/landing/FloatingWhatsApp';
import { BackToTop } from '../components/landing/BackToTop';

export const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = [
      'hero',
      'feature-overview',
      'why-ryncode',
      'implementation-timeline',
      'services',
      'portfolio',
      'partners',
      'testimonials',
      'faq',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#030712] dark:text-slate-100 transition-colors">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="flex-1">
        <Hero onNavigate={scrollToSection} />
        <FeatureOverview />
        <WhyRyncode />
        <Timeline />
        <Services />
        <Portfolio />
        <PartnerSlider />
        <TestimonialSlider />
        <Faq />
        <ContactForm />
      </main>

      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
};
