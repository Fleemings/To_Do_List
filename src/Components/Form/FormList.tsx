import * as React from 'react';
import { ITask } from '../../Interfaces/ITask';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

export interface IFormListProps {
  taskList: ITask[];
  handleDelete(id: number): void;
}

export default function FormList({
  taskList,
  handleDelete,
}: IFormListProps) {
  return (
    <>
      <Container
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
        className='mb-5'
      >
        {taskList.length > 0 ? (
          taskList.map((task) => (
            <Row className='mt-3' key={task.id}>
              <Col>
                <Stack direction='horizontal' gap={3}>
                  <ListGroup horizontal>
                    <ListGroup.Item>{task.title}</ListGroup.Item>
                    <ListGroup.Item variant='warning'>
                      Difficulty: {task.difficulty}
                    </ListGroup.Item>
                  </ListGroup>
                  <i className='bi bi-pencil text-light bg-warning p-2 rounded '></i>
                  <div className='vr' />
                  <i
                    className='bi bi-trash text-light bg-danger p-2  rounded'
                    onClick={() => handleDelete(task.id)}
                  ></i>
                </Stack>
              </Col>
            </Row>
          ))
        ) : (
          <p className='mt-4'>No task has been added</p>
        )}
      </Container>
    </>
  );
}
