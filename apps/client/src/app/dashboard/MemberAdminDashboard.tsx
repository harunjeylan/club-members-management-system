import Header2 from '@client/components/ui/Header2';

export default async function MemberAdminDashboard() {
  return (
    <section className="w-full flex flex-col gap-8 p-4">
      <div className="flex justify-between w-full  border-b border-secondary-500 my-4 pb-2">
        <Header2 title="Member Dashboard" />
      </div>
      <div className="w-full h-full flex rounded-md bg-secondary-200 dark:bg-secondary-900">
        <div className="mx-auto h-80 flex items-center justify-center">
          <div className="my-auto  font-bold  text-xl md:text-4xl p-8">
            Wel come to ASTU CSEC Club Member Dashboard
          </div>
        </div>
      </div>
    </section>
  );
}
