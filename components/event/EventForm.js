import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
};

const EventForm = ({
  user,
  id,
  game,
  description,
  date,
  time,
}) => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setCurrentEvent({
        game,
        description,
        date,
        time,
        userId: user.uid,
      });
    }
  }, [date, description, game, id, time, user]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateEvent(id, currentEvent).then(router.push('/events'));
    } else {
      const event = {
        game: Number(currentEvent.game),
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };

      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          aria-label="Select Game"
          name="game"
          required
          value={currentEvent.game}
          onChange={handleChange}
        >
          <option value="">What we are playing:</option>
          {games.map((gameObj) => (
            <option key={gameObj.id} value={gameObj.id}>{gameObj.title}</option>
          ))}
        </Form.Select>

        <Form.Group className="mb-3">
          <Form.Label>Describe. In Detail.</Form.Label>
          <Form.Control name="description" type="text" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>What Day:</Form.Label>
          <Form.Control name="date" required type="text" value={currentEvent.date} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>What Time:</Form.Label>
          <Form.Control name="time" required type="text" value={currentEvent.time} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number,
  game: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
};

EventForm.defaultProps = {
  id: null,
  game: 0,
  description: '',
  date: '',
  time: '',
};

export default EventForm;
