import React, { useState, useReducer, useRef, useEffect } from 'react';
import './App.css';
import {v4} from "uuid"
import reducer from './reducer';

function App() {
  const inputRef = useRef(null);
  const buttonRefs =useRef([]);
  const taskRefs = useRef([]);

  const getListsFromLocal = () => {
    const lists = localStorage.getItem('lists');
    return lists ? JSON.parse(lists) : [];
  };
  
  const [state, dispatch] = useReducer(reducer, {
    lists: getListsFromLocal(),
  })
   
  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(state.lists));
  }, [state.lists])


  const onSave =(e) =>{
    if(inputRef.current.value===""){
      alert("Vui lòng điền thông tin công việc cần làm!");
      return
    }
    const newWork = { id: v4(), title: inputRef.current.value, isDone: false };
    dispatch({ action: 'lists/onSave', payload: newWork });
    inputRef.current.value = null;
  }

  const onButtonClick = (index)=>{
    if (!state.lists[index].isDone){
      if(confirm(`Bạn chắc chắn đã hoàn thành công việc số ${index +1}?`)){
        dispatch({action:"lists/done", payload: state.lists[index]});
        alert(`Đã hoàn thành công việc số ${index+1}`)
      }}
      else{
        if(confirm(`Bạn chắc chắn muốn bỏ trạng thái hoàn thành công việc số ${index +1}`)){
          dispatch({action:"lists/done", payload: state.lists[index]});
          alert("Bỏ chọn thành công!")
        }
      }
  } 

  return (
    <div className='container'>
      <h1 className='heading'>To Do List</h1>
      <div className="form-control">
        <input ref={inputRef} type="text" name="title" />
        <label>
          <span style={{ transitionDelay: '0ms' }}>Y</span>
          <span style={{ transitionDelay: '50ms' }}>o</span>
          <span style={{ transitionDelay: '100ms' }}>u</span>
          <span style={{ transitionDelay: '150ms' }}>r</span>
          <span style={{ transitionDelay: '200ms' }}> </span>
          <span style={{ transitionDelay: '250ms' }}>W</span>
          <span style={{ transitionDelay: '300ms' }}>o</span>
          <span style={{ transitionDelay: '350ms' }}>r</span>
          <span style={{ transitionDelay: '400ms' }}>k</span>
        </label>
        <button onClick={onSave} className="button-81">Save</button>
        </div>

        <div className='list-container'>
            {
               state.lists.length >= 1 ? (
                  state.lists.map((task, index) => (
                          <div style={{backgroundColor: task.isDone ? "#fff": "#ade8f4" }} className='item' key={task.id}  ref={(el) => (taskRefs.current[index] = el)}>
                             <p>{task.title}</p>
                             <button className='button-8' ref={(el) => (buttonRefs.current[index] = el)} onClick={()=> onButtonClick(index)}>Done</button>
                          </div>
                  ))
               ) : (
              <div className='item'><p>Hiện không có công việc nào!</p></div>
  )}
        </div>

    </div>
  
  );
}

export default App;
