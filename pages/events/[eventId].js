import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleEvent } from '../../utils/data/eventData';

const UpdateEvent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { eventId } = router.query;
  const [event, setEvent] = useState({});

  useEffect(() => {
    getSingleEvent(eventId).then(setEvent);
  }, [eventId]);

  return (
    <div>
      <h2>Update Event</h2>
      <EventForm user={user} id={event.id} game={event.game?.id} description={event.description} date={event.date} time={event.time} />
    </div>
  );
};

export default UpdateEvent;
