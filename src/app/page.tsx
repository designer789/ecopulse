import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureRadar from '@/components/FeatureRadar';
import RolesTabs from '@/components/RolesTabs';
import Tokenomics from '@/components/Tokenomics';
import Roadmap from '@/components/Roadmap';
import NetworkSection from '@/components/NetworkSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <FeatureRadar />
        </section>
        <section id="roles">
          <RolesTabs />
        </section>
        <section id="tokenomics">
          <Tokenomics />
        </section>
        <section id="roadmap">
          <Roadmap />
        </section>
        <section id="network">
          <NetworkSection />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
}
