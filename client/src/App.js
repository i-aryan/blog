import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import addPostComp from './components/addpost.component'
import feedComp from './components/feed.component'
import postExpandComp from './components/postexpand.component'
import editPostComp from './components/editpost.component'
import deletePostComp from './components/deletepost.component'


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='navclass container-fluid'>
          <div className='row'>
            <div className='col-2'>
            </div>
            <div className='col-6'>
              <Link to='/' className='mr-4 navbar-title unselectable'>BlogRack</Link>
            </div>
            <div className='col-2'>
              
            </div>
            <div className='col'>

            </div>
          </div>
        </div>

        <div className='container content-box'>
          <Route path="/" exact component={feedComp} />
          <Route path="/addkarpost" exact component={addPostComp} />
          <Route path="/post/:id" component={postExpandComp} />
          <Route path="/editkarpost/:id" component={editPostComp} />
          <Route path="/deletekarpost/:id" component={deletePostComp} />
        </div>

      <div className='footer-box unselectable'>
        Developed by Aryan Verma
      </div>
      </Router>
    );
  }

}

export default App;
