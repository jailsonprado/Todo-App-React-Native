import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  FunctionComponent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IProps {
  children: ReactElement;
}

export interface ITask {
  id: string;
  title: string;
}

export interface ITasksContext {
  tasks: ITask[];
  addTask(task: ITask): void;
  removeTask(id: string): void;
}

const taskData = '@MyTasks:Tasks';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TaskProvider: FunctionComponent<IProps> = ({children}) => {
  const [data, setData] = useState<ITask[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const taskList = await AsyncStorage.getItem(taskData);

      if (taskList) {
        setData(JSON.parse(taskList));
      }
    }

    loadTasks();
  }, []);

  const addTask = async (task: ITask) => {
    try {
      const newTaskList = [...data, task];
      setData(newTaskList);
      await AsyncStorage.setItem(taskData, JSON.stringify(newTaskList));
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const removeTask = async (id: string) => {
    const newTaskList = data.filter(task => task.id !== id);
    setData(newTaskList);
    await AsyncStorage.setItem(taskData, JSON.stringify(newTaskList));
  };

  return (
    <TasksContext.Provider value={{tasks: data, addTask, removeTask}}>
      {children}
    </TasksContext.Provider>
  );
};

export function useTaskList(): ITasksContext {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('UseTaskList deve ser usada em um TaskProvider');
  }
  return context;
}
