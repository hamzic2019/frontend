import React, {useEffect, useState} from 'react'
import './Navigation.css';





const Navigation = ({handelLogin, user, handelLogOut}) => {
 
    return (
        
     <div className='navigation'>
        <h3>Taskker<span style={{color: '#d35400'}}>.</span></h3>

        

        {Object.keys(user).length === 0 ? 

            <form className='forma' onSubmit={(e) => handelLogin(e)}>
                <input type="email" name="email" placeholder='Enter your email'/>
                <input type="password" name="password" placeholder='Enter passsword'/>
                <button type="submit">LOGIN</button>
            </form>
            :
            <div className='btns'>
                <p>{user.email}</p>
                <button className='logoutBtn' onClick={handelLogOut}>LOG OUT</button>
            </div>

        }
        
     </div>
    );
}

export default Navigation