import { Route, BrowserRouter } from "react-router-dom";
import Home from "./views/home/home.component";
import Detail from "./views/detail/detail.component";
import Landing from "./views/landing/landing.component";
import ActivityCreate from "./views/activity.Create/Activity.Create";
import Activities from "./views/activities/activities";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/home" component={Home} />
        <Route path="/home/:id" component={Detail} />
        <Route exact path="/" component={Landing} />
        <Route path="/activities/create" component={ActivityCreate} />
        <Route exact path="/activities" component={Activities} />
      </div>
    </BrowserRouter>
  );
}

export default App;
