import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
    let [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)
    const editFooHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit
            ? <input value={newTitle} onBlur={editFooHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={editFooHandler}>{props.title}</span>
    );
};