import { useState } from 'react';

import Login from './login';
import CreateAccountForm from './creataccount';
import Signup from './singup';
import { marginLeft } from 'styled-system';
const ParentComponent = () => {
    const [showform, setShowform] = useState(true);
    const[login,setlogin]=useState(true)
    const[signup,setsignup]=useState(false)
  
    const handleloginClick= () => {

        console.log("login click executed")
      setShowform(true)
    };
    const handlesignupClick = () => {
        console.log("signup click executed")
        setShowform(false)
      };
  
    return (
      <>
       <div style={{ width: '100%', textAlign: 'center', margin: '0 auto' }}>
  <label style={{ color: 'white', fontSize: '50px', fontWeight: 'bold', alignItems: 'center' }}>Riktam Meets</label>
</div>
        <div className="grid grid-cols-2">
        <div className="col-span-1 ml-60 mt-28">
          <img
            src="https://cdn.dribbble.com/users/1708816/screenshots/15637339/media/2ea4a194c3149189c2507d137f81a652.gif"
            alt="background"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="col-span-1 mt-10">
            {console.log(showform)}
        {showform ? (
                <>
                <div style={{ width: '80%', textAlign: 'center', margin: '0 auto' }}>
                <Login/>
                <button className='mt-5 underline font-mono text-xl text-slate-50' onClick={handlesignupClick}>or signup</button>
                </div>
                </>
          ) : (
            <>
            <div style={{ width: '80%', textAlign: 'center', margin: '0 auto' }}>
               <Signup/>
                <button className='mt-5 underline font-mono text-xl text-slate-50' onClick={handleloginClick}>or login</button>
                </div>
             </>
          )}
        </div>
      </div>
      </>
    );
  };
  

export default ParentComponent;
