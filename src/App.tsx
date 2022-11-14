import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListTitle: string = 'What to learn'
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }
    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }
    let tasksForRender: Array<TasksType> = [];
    if (filter === 'all') {
        tasksForRender = tasks
    } else if (filter === 'active') {
        tasksForRender = tasks.filter(tasks => tasks.isDone === false)
    } else if (filter === 'completed') {
        tasksForRender = tasks.filter(tasks => tasks.isDone === true)
    }
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasksForRender} removeTask={removeTask} changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;