import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getEvents } from '../../utils/data/eventData';
import EventCard from '../../components/event/EventCard';
import { useAuth } from '../../utils/context/authContext';

function EventsHome() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const eventCards = () => {
    getEvents().then(setEvents);
  };

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
          <EventCard user={user} id={event.id} userId={event.organizer.uid} game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} onUpdate={eventCards} />
        </section>
      ))}
    </article>
  );
}

export default EventsHome;
