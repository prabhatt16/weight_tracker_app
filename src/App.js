import './App.css';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import  { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route path="/home" component={HomePage}>
            <HomePage/>
          </Route>
          <Route path="/login" component={LoginPage}>
            <LoginPage/>
          </Route>
          <Route path="" component={SignUpPage}>
            <SignUpPage/>
          </Route>                    
      </Switch>
      </Router>
    </div>
  );
}

export default App;
