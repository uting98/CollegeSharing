import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom';
import Navigation from './pages/Navigation';
import PostsListPage from './pages/PostsListPage';
import SubmitProduct from './pages/Form/SubmitProduct';
import Signup from './pages/Form/Signup';
import Login from './pages/Form/Login';
import AccountPage from './pages/AccountPage';
import AboutUsPage from './pages/AboutUsPage'
import IndividualProduct from "./pages/IndividualProduct";
import Chat from "./pages/Form/Chat";

import bg from './pages/bg-6.jpg';
import './App.css';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div style={{overflow:'auto', width:'100vw', height:'100vh', margin:'0', backgroundImage:'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('+bg+')',
           backgroundSize:'100% 100%', backgroundRepeat:'repeat', backgroundPosition:'center', backgroundAttachment: 'fixed'}}>
       
          <Navigation />
          <div className="container-fluid text-center" >
            <div className="row justify-content-center">
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login"  component={Login} />
                <Route path="/productSubmission" component={SubmitProduct} />
                <Route path="/accountPage" component={AccountPage} />
                <Route path="/IndividualProduct" component={IndividualProduct} />
                <Route path="/chat/:id" component={Chat} />
                <Route path="/about" component={AboutUsPage} />
                <Route path="/" component={PostsListPage} />
              </Switch>
            </div>
          </div>
          </div> 
        </Router>
    );
  }
}


export default App;
