import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type FirstActionType = ReturnType<typeof removeTaskAC>
export type SecondActionType = ReturnType<typeof addTaskAC>
export type ChangeActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleActionType = ReturnType<typeof changeTasksTitleAC>

type ActionsType = FirstActionType | SecondActionType | ChangeActionType | ChangeTitleActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-STATUS-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-STATUS-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-STATUS-TASK', taskId, isDone, todolistId} as const
}

export const changeTasksTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-STATUS-TITLE', taskId, title, todolistId} as const
}