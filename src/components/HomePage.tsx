import React from 'react';
import { Hero } from './Hero';
import { TrustStrip } from './TrustStrip';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedTools } from './FeaturedTools';
import { ProContractorSection } from './ProContractorSection';
import { WhyChooseUs } from './WhyChooseUs';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryGrid />
      <FeaturedTools />
      <ProContractorSection />
      <WhyChooseUs />
    </>
  );
};
