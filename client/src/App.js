import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import Navigation from './pages/Navigation';
import PostsListPage from './pages/PostsListPage';
import SubmitProduct from './pages/Form/SubmitProduct';
import Signup from './pages/Form/Signup';
import Login from './pages/Form/Login';
import AccountPage from './pages/AccountPage';
import IndividualProduct from "./pages/IndividualProduct";
import bg from './pages/baruch-3.png';
import './App.css';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div style={{overflow:'auto', width:'100vw', height:'100vh', margin:'0',background:'url('+bg+')  repeat center fixed', backgroundSize:'cover'}}>
          <Navigation />
          <div className="container-fluid text-center" >
            <div className="row justify-content-center">
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/productSubmission" component={SubmitProduct} />
                <Route path="/accountPage" component={AccountPage} />
                <Route path="/IndividualProduct" component={IndividualProduct} />
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
