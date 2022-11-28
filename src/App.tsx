import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }
    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }


    const getFilteredTasks =
        (tasks: Array<TasksType>, filter: FilterValuesType): Array<TasksType> => {
            switch (filter) {
                case "completed":
                    return tasks.filter(tasks => tasks.isDone)
                case 'active':
                    return tasks.filter(tasks => !tasks.isDone)
                default:
                    return tasks
            }
        }
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={getFilteredTasks(tasks, filter)}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;