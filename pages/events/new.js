import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventForm from '../../components/event/EventForm';
import { useAuth } from '../../utils/context/authContext';

const NewEvent = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div>
      <h2>Register New Event</h2>
      <p>Wanna play a game not listed?</p>
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      <EventForm user={user} />
    </div>
  );
};

export default NewEvent;
