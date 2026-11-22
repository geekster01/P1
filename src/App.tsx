import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MetricStrip } from './components/MetricStrip';
import { FeatureBento } from './components/FeatureBento';
import { QuoteEstimatorSection } from './components/QuoteEstimatorSection';
import { FaqFooter } from './components/FaqFooter';

export function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main id="main-content">
        <Hero />
        <MetricStrip />
        <FeatureBento />
        <QuoteEstimatorSection />
        <FaqFooter />
      </main>
    </div>
  );
}

export default App;
