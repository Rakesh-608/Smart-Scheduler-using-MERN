// frontend/src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/register', {
//         username,
//         password,
//       });

//       console.log(response.data.json);
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
//   };

//   return (
//     <div class="Registration">
//       <h1>User Registration</h1>
//       <form>
//         <label className='RegistrationForm'>
//           Username : 
//           <input type="text" placeholder='abc@xyz.com' value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label className='RegistrationForm'>
//           Password :
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default App;






import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password });
      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.token);
      console.log('Login successful');
    } catch (error) {
      console.error('Error logging in:', error.response.data.message);
    }
  };

  return (
    <div>
      <h1>MERN Auth App</h1>
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button onClick={handleLogin}>Login</button>
      </div>
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;
