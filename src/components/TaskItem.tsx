import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import DeleteIcon from '../assets/icons/delete.png';
import EditIcon from '../assets/icons/edit.png';
import trashIcon from '../assets/icons/trash/trash.png';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskItemProps {
  task: Task;
  editTask: (id: number, title: string) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  task,
  editTask,
  toggleTaskDone,
  removeTask,
}: TaskItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleEditTitle() {
    if (editMode) {
      setTitle(task.title);
    }
    setEditMode(!editMode);
  }

  function handleNewTitle(newTitle: string) {
    setTitle(newTitle);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editMode) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editMode]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          disabled={editMode && true}
          onPress={() => {
            toggleTaskDone(task.id);
          }}
        >
          <View
            testID={`marker-${task.id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name='check' size={12} color='#FFF' />}
          </View>

          <TextInput
            ref={textInputRef}
            value={title}
            onChangeText={(newTitle) => {
              handleNewTitle(newTitle);
            }}
            onSubmitEditing={() => {
              setEditMode(!editMode);
              editTask(task.id, title);
            }}
            editable={editMode && true}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity
          testID={`edit-${task.id}`}
          style={!editMode ? styles.editAction : styles.cancelAction}
          onPress={() => {
            handleEditTitle();
          }}
        >
          {editMode ? (
            <Image source={DeleteIcon} />
          ) : (
            <Image source={EditIcon} />
          )}
        </TouchableOpacity>
        {!editMode && (
          <TouchableOpacity
            testID={`trash-${task.id}`}
            style={styles.trashAction}
            onPress={() => {
              removeTask(task.id);
            }}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },

  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 78,
  },

  editAction: {
    paddingRight: 12,
    borderRightWidth: 0.7,
    borderRightColor: '#C4C4C4',
  },

  trashAction: {
    paddingLeft: 12,
    paddingRight: 24,
  },
});
