'use client';
import formatDateTime from '@client/utils/formatDateTime';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from '@harunjeylan/next-timeline';
import { Category, Event } from '@prisma/client';
import { MdEventAvailable, MdLocationOn } from 'react-icons/md';

function EventList({ events }: { events: (Event & { category: Category })[] }) {
  return (
    <div className="relative">
      <VerticalTimeline animate={false} lineColor="#3b82f6" className="">
        {events.map((event) => (
          <VerticalTimelineElement
            className="p-2"
            key={event.id}
            date={`${formatDateTime(event.startAt)} to ${formatDateTime(
              event.endAt
            )}`}
            iconStyle={{ background: '#3b82f6' }}
            icon={<MdEventAvailable size={20} />}
            iconClassName={'p-0 border-primary-500'}
            visible={true}
            dateClassName={'p-2'}
            contentClassName={
              'p-4 rounded-lg bg-secondary-100 dark:bg-secondary-900  after:bg-primary-500 shadow-lg'
            }
          >
            {event.published ? (
              <span className="flex w-full p-1 bg-success-500 rounded-lg mb-2"></span>
            ) : (
              ''
            )}
            <div className="rounded flex flex-col gap-4 mb-2">
              <div className="flex gap-2 items-center">
                <h3 className="text-xl md:text-2xl font-bold">{event.title}</h3>
                {!!event.category && (
                  <span className="chip">{event.category.name}</span>
                )}
              </div>
              {!!event.spaceName && (
                <span className="chip">{event.spaceName}</span>
              )}
              <span className="chip">
                {event.repeat}
              </span>
              <span className="chip">
                {event.fullDay ? 'Full Day' : 'No Full Day'}
              </span>
              <p>{event.description}</p>
            </div>
            <address className="flex flex-nowrap gap-2 items-center">
              <MdLocationOn size={20} />
              <span>{event.location}</span>
            </address>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

export default EventList;
