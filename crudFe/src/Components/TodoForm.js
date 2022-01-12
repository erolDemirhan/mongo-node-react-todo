import axios from "axios";
import React, { useEffect } from "react";
import { useState } from 'react';
import TodoItem from "./TodoItem";
import styled from 'styled-components';

function TodoForm(){
    const link = 'http://localhost:5000/api/v1/crud';
    const [todos, setTodos] = useState([]);
    const [todoName, setTodoName] = useState('');
    const [todoComment, setTodoComment] = useState('');
    const [editTodoData, setEditTodoData] = useState(null);

    useEffect(() => {
        getTodos();
    }, [])

    useEffect(() => {
        if(editTodoData){
            setTodoName(editTodoData.name ? editTodoData.name : '');
            setTodoComment(editTodoData.name ? editTodoData.comment : '');
        }
    }, [editTodoData])

    async function getTodos(){
        const data = await axios.get(link);
        setTodos(data.data.crud);
    }

    const editTodos = (todosData) => {
        setEditTodoData(todosData);
    }

    async function addTodos(e){
        e.preventDefault();

        const todoData = {
            name: todoName ? todoName : undefined,
            comment: todoComment ? todoComment : undefined,
        }

        if(!editTodoData){
            await axios.post(link, todoData);
        }else{
            await axios.patch(`http://localhost:5000/api/v1/crud/${editTodoData._id}`, todoData);
        }
        
        setTodoName('');
        setTodoComment('');
        setEditTodoData('');
        getTodos();
    }

    const renderTodos = () => {
        let sortedTodos = [...todos];
        sortedTodos = sortedTodos.sort((a,b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return sortedTodos.map((todo, i) => {
            return <TodoItem key={i} todo={todo} getTodos={getTodos} editTodos={editTodos}/>
        })
    }

    const insertTodos = () => {
        return <div className="Texteditor">
            <form onSubmit={addTodos}>
                <div className="input-control">
                    <input type="text" id="name" placeholder="Name" value={todoName} onChange={(e) => setTodoName(e.target.value)} required/>
                </div>
                <div className="input-control">
                    <textarea name="" id="comment" cols="30" rows="5" placeholder="Content" value={todoComment} onChange={(e) => setTodoComment(e.target.value)}></textarea>
                </div>
                <button className="submit-btn">Add Todo</button>
            </form>
        </div>
    }

    return(
        <TodoFormStyled>
            {insertTodos()}
            {renderTodos()}
        </TodoFormStyled>
    )
}

const TodoFormStyled = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .Texteditor{
        width: 60%;
        padding-top: 4rem;
        form{
            padding-bottom: 5rem;
            .submit-btn{
                padding: .5rem 1.5rem;
                outline: none;
                cursor: pointer;
                background-color: #8F2141;
                border:none;
                border-radius: 34px;
                color: white;
                filter: drop-shadow(0px 4px 28px rgba(0, 0, 0, 0.25));
            }
        }
    }
`;

export default TodoForm;