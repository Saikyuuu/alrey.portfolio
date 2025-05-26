"use client";

import { useState } from "react";
import { Play, Award, Clock, Users, Mail, Phone, MapPin } from "lucide-react";
import ParticleImage from "@/components/particle-image";
import profileImage from "../assets/profile.png";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  const services = [
    {
      title: "Video Editing",
      description:
        "Professional video editing for commercials, documentaries, and social media content",
      icon: Play,
    },
    {
      title: "Color Grading",
      description:
        "Advanced color correction and grading to enhance the visual appeal of your content",
      icon: Award,
    },
    {
      title: "Motion Graphics",
      description:
        "Custom animations and motion graphics to bring your vision to life",
      icon: Clock,
    },
    {
      title: "Post-Production",
      description:
        "Complete post-production services including sound design and visual effects",
      icon: Users,
    },
  ];

  const portfolio = [
    {
      title: "Tech Startup Commercial",
      category: "Commercial",
      duration: "2:30",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Wedding Highlight Reel",
      category: "Wedding",
      duration: "4:15",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Product Launch Video",
      category: "Product",
      duration: "1:45",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Documentary Short",
      category: "Documentary",
      duration: "8:20",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Social Media Campaign",
      category: "Social Media",
      duration: "0:30",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Music Video",
      category: "Music",
      duration: "3:45",
      thumbnail: "/placeholder.svg?height=200&width=350",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Grammedia
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "services", "portfolio", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors duration-300 hover:text-blue-400 ${
                      activeSection === section
                        ? "text-blue-400"
                        : "text-gray-300"
                    }`}
                  >
                    {section}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Particle background */}
        <div className="absolute inset-0 z-0">
          <ParticleImage imageSrc={profileImage} />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Grammer Allen
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Bringing stories to life through cinematic editing, color grading,
            and motion graphics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("portfolio")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={profileImage}
                alt="Alex Chen"
                className="rounded-2xl w-full max-w-md mx-auto"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                With over 8 years of experience in video editing and
                post-production, I specialize in creating compelling visual
                narratives that captivate audiences and drive results.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From corporate commercials to wedding films, I bring technical
                expertise and creative vision to every project. My goal is to
                transform raw footage into polished, professional content that
                exceeds expectations.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">150+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">8+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <service.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded text-sm">
                    {project.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-400 mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Let's Create Something Amazing
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Ready to bring your vision to life? I'd love to hear about
                  your project and discuss how we can create compelling video
                  content together.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span>grammedia2@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <span>+639 09912 9159</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors duration-300 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Grammer Allen
          </div>
          <p className="text-gray-400 mb-6">
            Professional Video Editor & Motion Graphics Artist
          </p>
        </div>
      </footer>
    </div>
  );
}
