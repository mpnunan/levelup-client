import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

function GameCard({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  userId,
  user,
  onUpdate,

}) {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Card.Text>Skill Level: {skillLevel}</Card.Text>
        <>
          {userId === user.uid
            ? (
              <>
                <Link passHref href={`/games/${id}`}>
                  Update Game
                </Link>
                <Button variant="danger" onClick={deleteThisGame}>
                  {`Delete ${title}?`}
                </Button>
              </>
            )
            : null}
        </>
      </Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  userId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
