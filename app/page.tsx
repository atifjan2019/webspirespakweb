import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUs from "@/components/home/WhyUs";
import RecentPosts from "@/components/home/RecentPosts";
import CTA from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Webspires | Your Reliable Digital Partner",
  description:
    "We build high-performance websites and data-driven digital marketing strategies for businesses that want to grow.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesSection />
      <WhyUs />
      <RecentPosts />
      <CTA />
    </>
  );
}
