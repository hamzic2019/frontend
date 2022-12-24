import React, {useEffect, useState} from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import Cookies from 'js-cookie';
import LandingPage from './LandingPage/LandingPage';


const App = () => {
  const [user, setUser] = useState({});

  
  const loadDataOnlyOnce = () => {
    if(Cookies.get('user') !== undefined){
      setUser(JSON.parse(Cookies.get('user')));
    }
  };

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, []);


  // LOG OUT USERA
  const handelLogOut = () => {
    Cookies.remove('user');
    setUser({});
  }

  // LOG IN USER-a
  const handelLogin = async (e) => {

    // ova funkcija se koristi kada user klikne da se uloguje kao novi user
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value

    Cookies.remove('token')
    Cookies.remove('user')
    
    const rawResponse = await fetch('https://task-manager-application-haris.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    const content = await rawResponse.json();


    const user1 = {
      token: content.token,
      email: content.user.email,
      id: content.user._id
    }

    Cookies.set('user', JSON.stringify(user1));
    setUser(user1);

  } // handel login


  return (
    <div>
        <Navigation 
          user={user} 
          handelLogin={handelLogin}
          handelLogOut={handelLogOut}  
        />

        <LandingPage user={user} setUser={setUser} />


    </div>
  )
}

export default App

