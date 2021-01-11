// import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notifications from './components/Notifications';
import Login from './components/Login';
import ApplicationMgmt from './components/ApplicationMgmt';
import FillInfo from './components/FillInfo';
import ViewApplications from './components/ViewApplications';
import ApplicationDetails from './components/ApplicationDetails';
import HomeComponent from './components/HomePage';
import Modal from "react-modal"
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Provider } from "react-redux"
import store from "./redux/store"

toast.configure()
Modal.setAppElement("#root")

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/navbar" component={NavBar} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/fillInfo" component={FillInfo} />
            <Route path="/applicationMgmt" component={ApplicationMgmt} />
            <Route path="/viewapplications" exact component={ViewApplications} />
            <Route path="/viewapplications/:id" component={ApplicationDetails} />
            <Route path="/home" component={HomeComponent} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
