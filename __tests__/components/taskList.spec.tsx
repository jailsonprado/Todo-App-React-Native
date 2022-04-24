import 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-hooks';
import React from 'react';
import {Home} from '../../src/pages/Home';
import {TaskProvider, useTaskList} from '../../src/context/TasksContext';
import {TaskList} from '../../src/components/TaskList';

describe('Task List component', () => {
  it('verifique se o item foi removido da lista de tarefas', async () => {
    render(<TaskList />, {
      wrapper: TaskProvider,
    });
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TaskProvider,
    });
    const data = {id: 'Task01', title: 'Task01'};

    await act(() => result.current.addTask(data));

    expect(result.current.tasks[0].title).toEqual('Task01');

    await act(() => result.current.removeTask('Task01'));

    expect(result.current.tasks.length).toEqual(0);
  });
});
