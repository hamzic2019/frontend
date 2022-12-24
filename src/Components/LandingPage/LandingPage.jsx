import React, {useState, useEffect} from 'react'
import './LandingPage.css'
import Task from './../Task/Task';
import Cookies from 'js-cookie';

const LandingPage = ({user, setUser}) => {

  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);

  const loadDataOnlyOnce = async () => {
  
    if(Object.keys(user).length === 0){
      const user2 = JSON.parse(Cookies.get('user'));
      setUser(user2);
    }

    const rawResponse = await fetch('https://task-manager-application-haris.onrender.com/users/tasks', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${JSON.parse(Cookies.get('user')).token}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    const tasks = await rawResponse.json();

    setTasks(tasks);

  };

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, []);


  // Retrieving data from DB in regular intervals
  useEffect(() => {
    let myInterval = setInterval(fetchQuote, 800);
  
    return () => clearInterval(myInterval);
  
  }, []);
  
  const fetchQuote = async () => {

    const rawResponse = await fetch('https://task-manager-application-haris.onrender.com/users/tasks', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${JSON.parse(Cookies.get('user')).token}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });

    const tasks4 = await rawResponse.json();

    setTasks(tasks4);
 
    
    // your current code
  };

  const handelRemoveTask = async (id) => {

    const newTasks = tasks.filter(task => {
      return task._id !== id
    })

    setTasks(prev => {
      return newTasks
    })

    const rawResponse = await fetch(`https://task-manager-application-haris.onrender.com/tasks/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': `Bearer ${JSON.parse(Cookies.get('user')).token}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    //const task3 = await rawResponse.json();

  } // handel remove task



  // Handel New Task
  const handelNewTask = async (e) => {
      e.preventDefault(); // Preventing default reloading on form submit!
      const rawResponse = await fetch('https://task-manager-application-haris.onrender.com/tasks', {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${JSON.parse(Cookies.get('user')).token}`, 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({task: `${e.target.task.value}`})
      });
      
      setModal(!modal)
   
  } // handel new task


  // Handeling modal state
  const handelModalState = () => {
    setModal(!modal)
  }  // Handeling modal state

  return (
    <div className='wrapper'>

        {Object.keys(user).length === 0 ?

            <h1>Taskker<span style={{color: '#d35400'}}>.</span></h1>
            :
            <Task tasks={tasks} handelRemoveTask={handelRemoveTask} />
        }


        {Object.keys(user).length === 0 && <button className='addBtn' onClick={handelModalState}>ADD NEW TASK</button>}

      
        {modal && <div className='modal'>
              <form className='modal-forma' onSubmit={(e) => handelNewTask(e)}>
                  <input name="task" type="text" placeholder='e.g. Enter your task' />
                  <button type='submit'>SUBMIT</button>
                  <div>
                    <button onClick={handelModalState}>CLOSE</button>
                  </div>
              </form>
              
        </div>}



    </div>
  )
}

export default LandingPage