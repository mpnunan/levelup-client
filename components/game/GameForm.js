import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes.then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    createGame(game).then(() => router.push('/games'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            aria-label="Select Game Type"
            name="gameType"
            required
            value={currentGame.gameType}
            onChange={handleChange}
          >
            <option>Type of Game:</option>
            {gameTypes.map((gameType) => (
              <option value={gameType.id}>{gameType.label}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Made by:</Form.Label>
          <Form.Control name="maker" required type="text" value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of players:</Form.Label>
          <Form.Control name="numberOfPlayers" required type="number" value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill level (1-10):</Form.Label>
          <Form.Control name="skillLevel" required type="number" value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
