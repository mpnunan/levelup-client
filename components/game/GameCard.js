import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const GameCard = ({
  id,
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  userId,
  user,
}) => (
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
            <Link passHref href={`/games/${id}`}>
              Update Game
            </Link>
          )
          : null}
      </>
    </Card.Footer>
  </Card>
);

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
};

export default GameCard;
