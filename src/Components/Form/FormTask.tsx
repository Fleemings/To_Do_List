import * as React from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ITask } from '../../Interfaces/ITask';

export interface IFormTaskProps {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty: number): void;
}

export default function FormTask({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: IFormTaskProps) {
  const [errorMsg, setErrorMsg] = React.useState(false);
  const [id, setId] = React.useState<number>(0);
  const [title, setTitle] = React.useState('');
  const [difficulty, setDifficulty] = React.useState(0);

  const handleButtonClick = () => {
    const tasks: ITask = { id, title, difficulty };
    if (!tasks.title) {
      setErrorMsg(true);
    } else {
      setErrorMsg(false);
    }
  };

  const addTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskList) {
      if (handleUpdate) {
        handleUpdate(id, title, difficulty);
      } else {
        // Random Task Id
        const id = Math.floor(Math.random() * 1000);
        // Variabel with Task informations
        const newTask: ITask = { id, title, difficulty };

        if (!title) {
          setTaskList!([...taskList]);
        } else {
          // Updating array with new value
          setTaskList!([...taskList, newTask]);
        }
        // Setting to inital state
        setTitle('');
        setDifficulty(0);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setDifficulty(+e.target.value);
    }
  };

  React.useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
    if (errorMsg) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must add a new task',
      });
    }
  }, [task, errorMsg]);

  return (
    <Container>
      <h2 className='mb-4 mt-4 text-center'>
        What are your plans for today?
      </h2>
      <Form onSubmit={addTaskHandler}>
        <Row className='justify-content-center'>
          <Col xs={8} md={6}>
            <Form.Group className='mb-3' controlId='title'>
              <FloatingLabel label='Your Task:'>
                <Form.Control
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={8} md={6}>
            <Form.Group className='mb-3' controlId='difficulty'>
              <FloatingLabel label='Difficulty level:'>
                <Form.Control
                  type='number'
                  name='difficulty'
                  value={difficulty}
                  onChange={handleInputChange}
                />
              </FloatingLabel>
              <Form.Text className='text-muted'>
                Helping you to complete your tasks is the main goal.
              </Form.Text>
            </Form.Group>
            <Button
              variant='info'
              type='submit'
              value={btnText}
              size='sm'
              className='mb-3 mt-3  col-md-5 mx-auto'
              onClick={handleButtonClick}
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
