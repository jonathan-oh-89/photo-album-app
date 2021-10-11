import React from 'react'
import './App.css';
import Home from "./pages/Home";
import Fail from "./pages/Fail";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import UserDashboard from "./pages/UserDashboard";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import { AppProvider } from "./context/appContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <NavBar />
          <SignUpForm />
          <Route exact path='/' component={Home} />
          <ProtectedRoute exact path='/userdashboard' component={UserDashboard} />
          <Route exact path='/fail' component={Fail} />
          {/* <Route exact path='/photoalbum' component={ProfileDashboard} /> */}
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
