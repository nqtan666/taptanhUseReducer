import React, { useRef, useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    listTodo: [],
    isLoading: false,
};
const actionReducer = (state, { type, payload }) => {
    switch (type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
            };
        case 'ADD_TODO':
            return {
                listTodo: [...state.listTodo, payload],
                isLoading: false,
            }
        case 'DEL_TODO':
            return {
                listTodo: payload,
            }
        default:
            return state;
    }
}

function TodoReducer() {
    const refInput = useRef();
    const [state, dispatch] = useReducer(actionReducer, initialState);
    const handleAdd = () => {
        if (refInput.current.value.trim() !== "") {
            dispatch({ type: 'LOADING' })
            const newTodo = {
                id: uuidv4(),
                name: refInput.current.value
            }
            setTimeout(() => {
                dispatch({ type: 'ADD_TODO', payload: newTodo });
                refInput.current.value = '';
            }, 500);
        }
    }
    const handleDel = (id) => {
        const todoFiltered = state.listTodo.filter((item) => item.id !== id);
        dispatch({ type: 'DEL_TODO', payload: todoFiltered })
    }
    return (
        <div className="container">
            <div className="row">
                <h1>TodoList</h1>
                <input type="text" ref={refInput} />
                <button onClick={handleAdd}>ADD</button>
                <h2> To do List</h2>
                {state.isLoading ? (
                    <div>Loadding...</div>
                ) : (
                    <div>
                        <ul>
                            {state.listTodo.map(({ name, id }) => (
                                <li key={id}>
                                    <span
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDel(id)}
                                    >
                                        {name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
export default TodoReducer;