import Footer from '@client/components/Footer';
import HeroSection from '../components/HeroSection';

export default async function Home() {
  return (
    <>
      <main className="relative">
        <HeroSection />
        {/* <Suspense fallback={<div>Loading..</div>}>
          <CategorySlider />
        </Suspense>
        <Suspense fallback={<div>Loading..</div>}>
          <PopularProducts />
        </Suspense>
        <Suspense fallback={<div>Loading..</div>}>
          <NewArrival />
        </Suspense> */}
      </main>
      <Footer />
    </>
  );
}
