import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getEvents } from '../../utils/data/eventData';
import EventCard from '../../components/event/EventCard';

function EventsHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} />
        </section>
      ))}
    </article>
  );
}

export default EventsHome;
