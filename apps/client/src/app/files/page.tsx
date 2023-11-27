import FileCard from '@client/components/File/FileCard';
import Header2 from '@client/components/ui/Header2';
import getFiles from '@client/libs/server/getFiles';

async function Page() {
  const fils = await getFiles();
  return (
    <section className="w-full ">
      <div className="w-full px-1 md:px-2 lg:px-4 mx-full ">
        <div className="flex justify-between w-full border-b border-secondary-500  my-4 pb-2">
          <Header2 title="Fils" />
        </div>
        <div className="w-full grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fils.map((file, ind) => (
            <FileCard key={ind} file={file} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;
