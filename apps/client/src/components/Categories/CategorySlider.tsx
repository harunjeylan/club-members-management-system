import getCategories from '@client/libs/server/getCategories';
import Header from '../ui/Header';
import Slider from '../ui/Slider';
import Link from 'next/link';

async function CategorySlider() {
  const categories = await getCategories();
  return (
    <section className="w-full">
      <div className="w-full max-w-7xl mx-auto py-16 flex flex-col gap-4">
        <Header title="Categories" />
        <div className="w-full max-w-7xl mx-auto ">
          <Slider
            navigator={false}
            className="basis-1/2 md:basis-1/4 lg:basis-[20%]"
          >
            {categories.map((category, ind) => (
              <div
                key={ind}
                className=" w-full flex flex-col gap-2 bottom-0  p-3 rounded-b-3xl"
              >
                <Link
                  href={`/category/${category.name}`}
                  className="font-bold text-md"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default CategorySlider;
