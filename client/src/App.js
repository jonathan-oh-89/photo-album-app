import React from 'react'
import './App.css';
import Home from "./pages/Home";
import Fail from "./pages/Fail";
import AuthenticationForm from "./components/AuthenticationForm/AuthenticationForm";
import UserDashboard from "./pages/UserDashboard";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import { AppProvider } from "./context/appContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Gallery from './pages/Gallery';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <NavBar />
          <AuthenticationForm />
          <Route exact path='/' component={Home} />
          <Route exact path='/photogallery' component={Gallery} />
          <Route exact path='/about' component={About} />
          <ProtectedRoute exact path='/userdashboard' component={UserDashboard} />
          <Route exact path='/fail' component={Fail} />
          {/* <Route exact path='/photoalbum' component={ProfileDashboard} /> */}
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
