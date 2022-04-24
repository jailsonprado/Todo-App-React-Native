import 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';
import React from 'react';
import {Home} from '../../src/pages/Home';
import {TaskProvider, useTaskList} from '../../src/context/TasksContext';

describe('Home page', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Home />);

    const inputNewTask = getByPlaceholderText('Nova tarefa...');

    expect(inputNewTask).toBeDefined();
    expect(inputNewTask.props.placeholder).toBeTruthy();
  });
  it('verify insert task in item list', async () => {
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TaskProvider, // envolvendo o nosso hooks no context global TaskProvider
    });

    const data = {id: 'Task01', title: 'Task01'};

    await act(() => result.current.addTask(data));

    expect(result.current.tasks).toBeTruthy();
  });

  it('verify click in button addd task', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />, {
      wrapper: TaskProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TaskProvider,
    });

    const inputNewTask = getByPlaceholderText('Nova tarefa...');
    const button = getByTestId('addButton');

    const data = {id: 'Task01', title: 'Task01'};

    act(() => fireEvent.changeText(inputNewTask, data.title));

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(result.current.tasks).toBeTruthy();
  });
});
