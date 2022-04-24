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

  //TESTs with Jest => aqui estou testando o click do button de adcionar tarefas, o testID adcionado no TouchableOpacity na page home esta sendo testado aqui
  it('verify click in button addd task', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />, {
      wrapper: TaskProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TaskProvider,
    });

    const inputNewTask = getByPlaceholderText('Nova tarefa...');
    const button = getByTestId('addButton'); // buscando o testID adc no Home

    const data = {id: 'Task01', title: 'Task01'}; //Dados que vao ser inseridos no TextInput

    act(() => fireEvent.changeText(inputNewTask, data.title)); // O firevent é usado para usar os eventos, nesse aqui eu adc o texto do input no campo title

    await act(async () => {
      await fireEvent.press(button); // O firevent foi usado para pressionar o botao, seguindo um assicronismo para fazer o evento sem erros
    });

    expect(result.current.tasks).toBeTruthy(); // Eu espero um resultado verdadeiro usando o toBeTruthy para fazer essa verificação
  });
});
