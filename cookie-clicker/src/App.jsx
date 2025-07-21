// import { useState, useEffect } from 'react';
// import './App.css';




// function App() {
//   const [cookies, setCookies] = useState(() => {
//     const saved = localStorage.getItem('cookies');
//     return saved ? Number(saved) : 0;
//   });


//   const [isClicked, setIsClicked] = useState(false);
//   const [fallingCookies, setFallingCookies] = useState([]);


//   const [floaters, setFloaters] = useState([]);//help


//   // Click value upgrades
//   const [clickValue, setClickValue] = useState(() => {
//     const saved = localStorage.getItem('clickValue');
//     return saved ? Number(saved) : 1;
//   });


//   // Golden cookie state
//   const [goldenCookie, setGoldenCookie] = useState(null);


//   useEffect(() => {
//     localStorage.setItem('cookies', cookies);
//   }, [cookies]);


//   useEffect(() => {
//     localStorage.setItem('clickValue', clickValue);
//   }, [clickValue]);


//   // Spawn golden cookie
//   useEffect(() => {
//     const spawn = () => {
//       const id = Date.now();//unix epoch? jan 1 1970
//       const left = Math.random() * 80 + 10;
//       const top = Math.random() * 70 + 10;
//       setGoldenCookie({ id, left, top });
//       setTimeout(() => setGoldenCookie(null), 7000);
//     };
//     const interval = setInterval(spawn, Math.random() * 30000 + 30000);
//     return () => clearInterval(interval);//cleans
//   }, []);


//   // Golden cookie click
//   const handleGoldenCookieClick = () => {
//     setCookies(prev => prev + 50);
//     setGoldenCookie(null);
//   };


//   // Click main cookie
//   const handleClick = e => {
//     setCookies(prev => prev + clickValue);
//     setIsClicked(true);
//     setTimeout(() => setIsClicked(false), 150);
//     spawnFallingCookie();
//     spawnFloater(e);
//   };


//   // Falling cookie
//   const spawnFallingCookie = () => {
//     const id = Date.now();
//     const left = Math.random() * 90;
//     setFallingCookies(prev => [...prev, { id, left }]);
//     setTimeout(() => {
//       setFallingCookies(prev => prev.filter(c => c.id !== id));
//     }, 3000);
//   };


//   const spawnFloater = e => {
//     const id = Date.now();
//     const x = e.clientX;
//     const y = e.clientY;
//     setFloaters(prev => [...prev, { id, x, y }]);
//     setTimeout(() => {
//       setFloaters(prev => prev.filter(f => f.id !== id));
//     }, 1000);
//   };


//   // Reset all cookies
//   const handleReset = () => {
//     setCookies(0);
//     localStorage.setItem('cookies', 0);
//   };


//   // Upgrade: subs diff
//   const handleUpgrade = () => {
//     if (cookies >= 100) {
//       setCookies(prev => prev - 100);
//       setClickValue(prev => prev + 1);
//     }
//   };


//   // Reset click value back to 1
//   const handleResetClickValue = () => {
//     setClickValue(1);
//     localStorage.setItem('clickValue', 1);
//   };


//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1> Cookie Clicker!</h1>
//       <h2>Cookies: {cookies}</h2>


//       {/* Main cookie */}
//       <img
//         src="/cookie.png"
//         alt="Cookie"
//         onClick={handleClick}
//         className={`cookie ${isClicked ? 'clicked' : ''}`}
//       />


//       {/* Golden cookie */}
//       {goldenCookie && (
//         <img//ai
//           src="/golden_cookie.png"
//           alt="Golden Cookie"
//           className="golden-cookie"
//           style={{ left: `${goldenCookie.left}%`, top: `${goldenCookie.top}%` }}
//           onClick={handleGoldenCookieClick}
//         />
//       )}


//       {/* Falling cookies */}
//       {fallingCookies.map(c => (
//         <img
//           key={c.id}
//           src="/cookie.png"
//           alt="Falling Cookie"
//           className="falling-cookie"
//           style={{ left: `${c.left}%` }}
//         />
//       ))}


//       {/* Floating +num */}
//       {floaters.map(f => (
//         <div
//           key={f.id}
//           className="floater"
//           style={{ left: f.x, top: f.y }}
//         >
//           +{clickValue}
//         </div>
//       ))}


//       {/* Reset cookies */}
//       <button onClick={handleReset} className="reset-button">
//         Reset Cookies
//       </button>


//       {/* Upgrade shop */}
//       <div className="upgrade-table">
//         <h3>Upgrade Shop</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Current Click Value</th>
//               <th>Upgrade Cost</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>+{clickValue}</td>
//               <td>100 Cookies</td>
//               <td>
//                 <button
//                   onClick={handleUpgrade}
//                   disabled={cookies < 100}
//                   className="upgrade-button"
//                 >
//                   Buy Upgrade
//                 </button>
//                 <br />
//                 <button
//                   onClick={handleResetClickValue}
//                   className="reset-upgrade-button"
//                   disabled={clickValue === 1}
//                 >
//                   Reset Click Value
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// export default App;
import { useState, useEffect } from 'react';
// Joke API: http://www.official-joke-api.appspot.com/random_joke
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import './App.css';
import cookieImg from './assets/cookie.png';
import fortuneCookieImg from './assets/fortune-cookie.png';
import goldenCookieImg from './assets/golden_cookie.png';


function App() {
 // Cookie type state
 const [cookieType, setCookieType] = useState("cookie");


 // Toggle cookie type
 const handleToggleCookieType = () => {
   setCookieType(prev => prev === "cookie" ? "fortune-cookie" : "cookie");
 };
 // Reset auto clickers
 const handleResetAutoClickers = () => {
   setAutoClickers(0);
 };
 // Auto clicker state
 const [autoClickers, setAutoClickers] = useState(0);
 // Auto clicker effect
 useEffect(() => {
   if (autoClickers > 0) {
     const interval = setInterval(() => {
       setCookies(prev => prev + autoClickers);
     }, 1000);
     return () => clearInterval(interval);
   }
 }, [autoClickers]);
 // Buy auto clicker
 const handleBuyAutoClicker = () => {
   if (cookies >= 500) {
     setCookies(prev => prev - 500);
     setAutoClickers(prev => prev + 1);
   }
 };
 // Joke state
 const [joke, setJoke] = useState(null);


 // Fetch joke function
 const fetchJoke = () => {
   setJoke(null); // Show loading
   fetch('http://www.official-joke-api.appspot.com/random_joke')
     .then(res => res.json())
     .then(data => setJoke(data))
     .catch(() => setJoke({ setup: 'Failed to load joke.', punchline: '' }));
 };


 // Fetch joke on mount
 useEffect(() => {
   fetchJoke();
 }, []);
 // Total cookies
 const [cookies, setCookies] = useState(() => {
   const saved = localStorage.getItem('cookies');
   return saved ? Number(saved) : 0;
 });


 const [isClicked, setIsClicked] = useState(false);
 const [fallingCookies, setFallingCookies] = useState([]);//help


 // Floating +num
 const [floaters, setFloaters] = useState([]);//help
 const [clickValue, setClickValue] = useState(() => {
   const saved = localStorage.getItem('clickValue');
   return saved ? Number(saved) : 1;
 });
 const [goldenCookie, setGoldenCookie] = useState(null);
 const [showConfetti, setShowConfetti] = useState(false);
 const [width, height] = useWindowSize();


 useEffect(() => {
   localStorage.setItem('cookies', cookies);
 }, [cookies]);
 useEffect(() => {
   localStorage.setItem('clickValue', clickValue);
 }, [clickValue]);


 // Spawn golden cookie
 useEffect(() => {
   const spawn = () => {
     const id = Date.now();// unix epoch? jan 1 1970
     const left = Math.random() * 80 + 10;
     const top = Math.random() * 70 + 10;
     setGoldenCookie({ id, left, top });
     setTimeout(() => setGoldenCookie(null), 7000);
   };
   const interval = setInterval(spawn, Math.random() * 30000 + 30000);
   return () => clearInterval(interval);
 }, []);


 // Golden cookie click
 const handleGoldenCookieClick = () => {
   setCookies(prev => prev + 50);
   setGoldenCookie(null);
 };


 // Main cookie click
 const handleClick = e => {
   setCookies(prev => {
     const newCookies = prev + clickValue;


     // Trigger confetti every 500 cookies
     if (newCookies % 500 < clickValue) {
       setShowConfetti(true);
       setTimeout(() => setShowConfetti(false), 5000);
     }


     return newCookies;
   });


   setIsClicked(true);
   setTimeout(() => setIsClicked(false), 150);
   spawnFallingCookie();
   spawnFloater(e);
 };


 // Falling cookie
 const spawnFallingCookie = () => {
   const id = Date.now();
   const left = Math.random() * 90;
   setFallingCookies(prev => [...prev, { id, left }]);
   setTimeout(() => {
     setFallingCookies(prev => prev.filter(c => c.id !== id));
   }, 3000);
 };


 // Floating +nums
 const spawnFloater = e => {
   const id = Date.now();
   const x = e.clientX;
   const y = e.clientY;
   setFloaters(prev => [...prev, { id, x, y }]);
   setTimeout(() => {
     setFloaters(prev => prev.filter(f => f.id !== id));
   }, 1000);
 };


 // Reset all cookies
 const handleReset = () => {
   setCookies(0);
   localStorage.setItem('cookies', 0);
 };


 // Buy upgrd
 const handleUpgrade = () => {
   if (cookies >= 100) {
     setCookies(prev => prev - 100);
     setClickValue(prev => prev + 1);
   }
 };


 // Reset click value
 const handleResetClickValue = () => {
   setClickValue(1);
   localStorage.setItem('clickValue', 1);
 };


 return (
   <div style={{ textAlign: 'center' }}>
     {/* Joke display */}
     <div
       style={{
         margin: '1.5rem 0',
         fontSize: '1.1rem',
         color: '#333',
         border: '2px solid #8b5a2b',
         borderRadius: '10px',
         padding: '1rem',
         background: 'rgba(255,255,255,0.8)'
       }}
     >
       {joke ? (
         <>
           <div><strong>Joke:</strong> {joke.setup}</div>
           <div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{joke.punchline}</div>
         </>
       ) : (
         <div>Loading joke...</div>
       )}
       <button
         onClick={fetchJoke}
         style={{
           marginTop: '1rem',
           padding: '0.4rem 1.2rem',
           fontSize: '1rem',
           backgroundColor: '#8b5a2b',
           color: 'white',
           border: 'none',
           borderRadius: '6px',
           cursor: 'pointer',
           transition: 'background-color 0.2s ease'
         }}
       >
         New Joke
       </button>
     </div>
     {/* Confetti */}
     {showConfetti && <Confetti width={width} height={height} />}


     <h1>Cookie Clicker!</h1>
     <h2>Cookies: {cookies}</h2>


     {/* Main cookie */}
     <img
       src={cookieType === "cookie" ? cookieImg : fortuneCookieImg}
       alt={cookieType === "cookie" ? "Cookie" : "Fortune Cookie"}
       onClick={handleClick}
       className={`cookie ${isClicked ? 'clicked' : ''}`}
     />
     {/* Change Cookie Type Button */}
     <button
       onClick={handleToggleCookieType}
       style={{
         position: "fixed",
         bottom: "30px",
         right: "30px",
         padding: "0.7rem 1.2rem",
         fontSize: "1rem",
         backgroundColor: "#d2691e",
         color: "white",
         border: "none",
         borderRadius: "50px",
         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
         cursor: "pointer",
         zIndex: 100
       }}
     >
       Change Cookie Type
     </button>


     {/* Golden cookie */}
     {goldenCookie && (
       <img
         src={goldenCookieImg}
         alt="Golden Cookie"
         className="golden-cookie"
         style={{ left: `${goldenCookie.left}%`, top: `${goldenCookie.top}%` }}
         onClick={handleGoldenCookieClick}//help
       />
     )}


     {/* Falling cookies */}
     {fallingCookies.map(c => (
       <img
         key={c.id}
         src={cookieType === "fortune-cookie" ? fortuneCookieImg : cookieImg}
         alt={cookieType === "fortune-cookie" ? "Falling Fortune Cookie" : "Falling Cookie"}
         className="falling-cookie"
         style={{ left: `${c.left}%` }}
       />
     ))}


     {/* Floating +num */}
     {floaters.map(f => (
       <div
         key={f.id}
         className="floater"
         style={{ left: f.x, top: f.y }}
       >
         +{clickValue}
       </div>
     ))}


     {/* Reset cookies */}
     <button onClick={handleReset} className="reset-button">
       Reset Cookies
     </button>


     {/* Upgrade shop */}
     <div className="upgrade-table">
       <h3>Upgrade Shop</h3>
       <table>
         <thead>
           <tr>
             <th>Current Click Value</th>
             <th>Upgrade Cost</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>+{clickValue}</td>
             <td>100 Cookies</td>
             <td>
               <button
                 onClick={handleUpgrade}
                 disabled={cookies < 100}
                 className="upgrade-button"
               >
                 Buy Upgrade
               </button>
               <br />
               <button
                 onClick={handleResetClickValue}
                 className="reset-upgrade-button"
                 disabled={clickValue === 1}
               >
                 Reset Click Value
               </button>
             </td>
           </tr>
           <tr>
             <td>Auto Clickers: {autoClickers}</td>
             <td>500 Cookies</td>
             <td>
               <button
                 onClick={handleBuyAutoClicker}
                 disabled={cookies < 500}
                 className="upgrade-button"
               >
                 Buy Auto Clicker
               </button>
               <br />
               <button
                 onClick={handleResetAutoClickers}
                 className="reset-upgrade-button"
                 disabled={autoClickers === 0}
               >
                 Reset Auto Clickers
               </button>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </div>
 );
}


export default App;


