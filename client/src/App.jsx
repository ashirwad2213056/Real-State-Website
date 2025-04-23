// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import  { BrowserRouter, Routes , Route} from 'react-router-dom'

import React from 'react'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import Header from './Components/Header'
import PrivateRoute from './Components/privateRoute'
import CreateListing from './Pages/CreateListing'
import UpdateListing from './Pages/UpdateListing'
import Listing from './Pages/Listings'
import Search from './Pages/Search'
export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/listing/:listingId" element={<Listing/>} />
    <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>} />
      <Route path="/create-listing" element={<CreateListing/>} />
      <Route path="/update-listing/:listingId" element={<UpdateListing/>} />
    </Route>
    <Route path="/about" element={<About/>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/sign-in" element={<SignIn/>} />
    <Route path="/sign-up" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  )
}

