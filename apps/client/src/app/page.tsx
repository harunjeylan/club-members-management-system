import Footer from '@client/components/Footer';
import HeroSection from '../components/HeroSection';
import BlogList from '@client/components/Blog/BlogList';
import { Suspense } from 'react';
import getPublishedBlogs from '@client/libs/server/getPublishedBlogs';
import getPublishedEvents from '@client/libs/server/getPublishedEvents';
import EventList from '@client/components/Event/EventList';
import Header from '@client/components/ui/Header';
import StatusList from '@client/components/Status/StatusList';

export default async function Home() {
  const blogs = await getPublishedBlogs();
  const events = await getPublishedEvents();
  return (
    <>
      <main className="relative flex flex-col gap-8 md:gap-12 lg:gap-16">
        <HeroSection />
        <section className="w-full">
          <div className="w-full px-1 md:px-2 lg:px-4 mx-full flex flex-col gap-4">
            <Suspense fallback={<div>Loading..</div>}>
              <StatusList />
            </Suspense>
          </div>
        </section>
        {!!blogs.length && (
          <section className="w-full py-12">
            <div className="w-full px-1 md:px-2 lg:px-4 mx-full flex flex-col gap-4">
              <Header
                title="Blogs"
                summery={
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, minima. Qui, consequuntur?'
                }
              />
              <Suspense fallback={<div>Loading..</div>}>
                <BlogList blogs={blogs} />
              </Suspense>
            </div>
          </section>
        )}
        {!!events.length && (
          <section className="w-full py-12 ">
            <div className="w-full px-1 md:px-2 lg:px-4 mx-full flex flex-col gap-4">
              <Header title="Events" summery={
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, minima. Qui, consequuntur?'
                } />
              <Suspense fallback={<div>Loading..</div>}>
                <EventList events={events} />
              </Suspense>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
