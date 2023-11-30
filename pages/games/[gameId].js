import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameForm from '../../components/game/GameForm';
import { useAuth } from '../../utils/context/authContext';
import { getSingleGame } from '../../utils/data/gameData';

const UpdateGame = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { gameId } = router.query;
  const [game, setGame] = useState({});

  useEffect(() => {
    getSingleGame(gameId).then(setGame);
  }, [gameId]);

  return (
    <div>
      <h2>Update Game</h2>
      <GameForm user={user} id={game.id} title={game.title} maker={game.maker} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} gameType={game.game_type?.id} />
    </div>
  );
};

export default UpdateGame;
