import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasExistTask = tasks.find((task) => task.title === newTaskTitle);

    if (!hasExistTask) {
      const data = {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      };
      setTasks([...tasks, data]);
    } else {
      return Alert.alert('Essa tarefa já foi adicionada.');
    }
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks(
      tasks.map((task) => (task.id == id ? { ...task, title: newTitle } : task))
    );
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover tarefa',
      'Tem certeza que você deseja remover essa tarefa?',
      [
        {
          style: 'cancel',
          text: 'Não',
        },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            setTasks((oldState) => oldState.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
