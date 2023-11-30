import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  title: '',
  maker: '',
  numberOfPlayers: 0,
  skillLevel: 1,
  gameType: 0,
};

const GameForm = ({
  user,
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  gameType,
}) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setCurrentGame({
        title,
        maker,
        numberOfPlayers,
        skillLevel,
        gameType,
      });
    }
  }, [gameType, id, maker, numberOfPlayers, skillLevel, title]);

  useEffect(() => {
    getGameTypes().then(setGameTypes);
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
    if (id) {
      updateGame(id, currentGame).then(() => router.push('/games'));
    } else {
      const game = {
        title: currentGame.title,
        maker: currentGame.maker,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };

      createGame(game).then(() => router.push('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>

        <Form.Select
          aria-label="Select Game Type"
          name="gameType"
          required
          value={currentGame.gameType}
          onChange={handleChange}
        >
          <option value="">Type of Game:</option>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </Form.Select>

        <Form.Group className="mb-3">
          <Form.Label>Made by:</Form.Label>
          <Form.Control name="maker" required type="text" value={currentGame.maker} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of players:</Form.Label>
          <Form.Control name="numberOfPlayers" required type="text" value={currentGame.numberOfPlayers} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Skill level (1-10):</Form.Label>
          <Form.Control name="skillLevel" required type="text" value={currentGame.skillLevel} onChange={handleChange} />
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
  id: PropTypes.number,
  title: PropTypes.string,
  maker: PropTypes.string,
  numberOfPlayers: PropTypes.number,
  skillLevel: PropTypes.number,
  gameType: PropTypes.number,
};

GameForm.defaultProps = {
  id: null,
  title: '',
  maker: '',
  numberOfPlayers: 0,
  skillLevel: 1,
  gameType: 0,
};

export default GameForm;
