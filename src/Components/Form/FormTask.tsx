import * as React from 'react';
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
}

export default function FormTask({
  btnText,
  taskList,
  setTaskList,
}: IFormTaskProps) {
  const [id, setId] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [difficulty, setDifficulty] = React.useState(0);

  const addTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Random Task Id
    const id = Math.floor(Math.random() * 1000);

    // Variabel with Task informations
    const newTask: ITask = { id, title, difficulty };
    // Updating array with new value
    setTaskList!([...taskList, newTask]);
    // Setting to inital state
    setTitle('');
    setDifficulty(0);
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
  return (
    <Container>
      <h2 className='mb-4 mt-4'>What are your plans for today?</h2>
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
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
