import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // Hero section parallax
    gsap.to(".hero-content", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Services cards stack animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.2,
        });
      }
    });

    // Resume section reveal
    gsap.from(".resume-content", {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#resume",
        start: "top center",
        toggleActions: "play none none reverse",
      },
    });

    // Advocacy section parallax
    gsap.to(".advocacy-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: "#advocacy",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    // Implement contact form modal or redirect
    console.log("Contact clicked");
  };

  const handleResumeDownload = () => {
    // Implement resume download
    console.log("Resume download clicked");
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "advocacy", label: "Advocacy" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div ref={mainRef} className="min-h-screen font-sans text-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#91B8DC]/95 shadow-lg backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-light tracking-wider text-white"
            >
              ROBERT A. SANCHEZ
            </motion.h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-wider transition-colors text-white hover:text-[#2D6FAB] ${
                    activeSection === item.id ? "text-[#2D6FAB]" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 text-white px-6 py-2 rounded-md transition-colors"
              >
                Work with me
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#91B8DC]"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-2 text-white hover:text-[#2D6FAB] hover:bg-white/10 rounded-md transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button className="w-full bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 text-white px-4 py-2 rounded-md transition-colors">
                  Work with me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-[#91B8DC] text-white flex items-center justify-center py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xl uppercase tracking-wider font-light mb-6">
              Your Certified Guide To
            </p>
            <h2 className="text-5xl md:text-7xl font-display font-thin leading-tight mb-12">
              Advocating Health Equity
              <br />& Social Justice
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 text-white px-8 py-4 rounded-md text-lg transition-colors"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#2D6FAB] text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-light mb-6">
              Our Services
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Empowering individuals and communities through comprehensive
              healthcare advocacy and education.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Patient Advocacy",
                description:
                  "Guiding individuals through complex healthcare processes with personalized care and expert support.",
                icon: "🏥",
              },
              {
                title: "Community Workshops",
                description:
                  "Interactive sessions designed to empower communities on health equity, policy, and advocacy.",
                icon: "👥",
              },
              {
                title: "Public Speaking",
                description:
                  "Engaging talks and keynotes focused on personal experiences, resilience, and transformative justice.",
                icon: "🎤",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-colors transform hover:-translate-y-2 duration-300"
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl uppercase tracking-wide mb-4 font-light">
                  {service.title}
                </h3>
                <p className="mb-6 text-white/90">{service.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#2D6FAB] hover:bg-white/90 px-6 py-2 rounded-md transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Highlight Section */}
      <section id="resume" className="bg-[#E9E9ED] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-3 aspect-h-4 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/robert-sanchez.webp"
                  alt="Robert Sanchez - Health Equity Advocate"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="resume-content">
              <h3 className="text-4xl font-display mb-8">
                Professional Experience
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Senior Clinical Interviewer & Patient Advocate",
                    company: "Albert Einstein Medical College",
                    period: "2020 - Present",
                  },
                  {
                    title: "Community Board Member",
                    company: "Icahn School of Medicine at Mount Sinai",
                    period: "2018 - 2020",
                  },
                  {
                    title: "Project Lead, Health Equity",
                    company: "WE at The World Health Equity",
                    period: "2016 - 2018",
                  },
                ].map((exp) => (
                  <div
                    key={exp.title}
                    className="border-l-2 border-[#2D6FAB] pl-6 transform hover:translate-x-2 transition-transform duration-300"
                  >
                    <h4 className="text-xl font-medium mb-2">{exp.title}</h4>
                    <p className="text-gray-600 mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.period}</p>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 text-white px-8 py-3 rounded-md transition-colors"
              >
                Download Full Resume
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Advocacy Section */}
      <section
        id="advocacy"
        className="bg-[#91B8DC] py-24 px-4 text-white relative overflow-hidden"
      >
        <div className="advocacy-bg absolute inset-0 bg-[#2D6FAB]/20" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-display font-light mb-8">
              Rehabilitation Through the Arts (RTA)
            </h3>
            <p className="text-lg max-w-3xl mx-auto mb-12">
              My work with RTA and the inspiration behind the movie{" "}
              <em>Sing Sing</em> underscores my commitment to transformative
              justice through creativity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 px-8 py-3 rounded-md transition-colors"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-display mb-6">Let's Connect</h3>
            <p className="text-lg mb-12 text-gray-600">
              Interested in collaboration or advocacy? Reach out today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2D6FAB] hover:bg-[#2D6FAB]/90 text-white px-8 py-3 rounded-md transition-colors"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-light mb-4">ROBERT A. SANCHEZ</h4>
              <p className="text-gray-400">
                Your Certified Guide To Advocating Health Equity & Social
                Justice
              </p>
            </div>
            <div>
              <h4 className="text-xl font-light mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-light mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Robert A. Sanchez. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
