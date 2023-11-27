import getDashboard from '@client/libs/server/getDashboard';
import StateCard from './StateCard';
export default async function StatusList() {
  const dashboard = await getDashboard();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
      <StateCard>
        <div className="text-7xl font-extrabold">{dashboard.spaces}</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-extrabold">Spaces</div>
        </div>
      </StateCard>
      <StateCard>
        <div className="text-7xl font-extrabold">{dashboard.users}</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-extrabold">Members</div>
        </div>
      </StateCard>
      <StateCard>
        <div className="text-7xl font-extrabold">{dashboard.events}</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-extrabold">Events</div>
        </div>
      </StateCard>
      <StateCard>
        <div className="text-7xl font-extrabold">{dashboard.blogs}</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-extrabold">Blogs</div>
        </div>
      </StateCard>
    </div>
  );
}
