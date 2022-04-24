import 'react-native';
import {render} from '@testing-library/react-native';
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
});