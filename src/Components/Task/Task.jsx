import React from 'react'
import './Task.css'

const Task = ({tasks, handelRemoveTask}) => {
  return (
    <div className='task-wrapper'>
       {
        tasks.map(task => (
          
          <div className='task' key={task._id}> 
              <input type="checkbox" className='checkboxclass' />
              <p className='content'>{task.task}</p>
              <button className='btn' onClick={() => handelRemoveTask(task._id)} >REMOVE</button>
          </div>

        ))
       }
      
    </div>
  )
}

export default Task