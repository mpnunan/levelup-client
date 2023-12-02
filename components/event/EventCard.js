import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

function EventCard({
  user,
  userId,
  id,
  game,
  description,
  date,
  time,
  organizer,
  onUpdate,
}) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>{game}</Card.Title>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Text>Organized by: {organizer}</Card.Text>
        <>
          {userId === user.uid
            ? (
              <>
                <Link passHref href={`/events/${id}`}>
                  Update Event
                </Link>
                <Button variant="danger" onClick={deleteThisEvent}>
                  Delete this event?
                </Button>
              </>
            )
            : null}
        </>
      </Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
