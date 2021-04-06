import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Posts from './components/ShowAllPosts'
import CreateNewPost from './components/CreateNewPost'
import ShowOnePost from './components/ShowOnePost'
import EditOnePost from './components/EditOnePost'
import SideBar from './navigation/SideBar'
import Footer from './navigation/Footer'
import StaticContent from './components/StaticContent';

const App = () => {
  return(
    <Router>
      <div>
        <SideBar />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/posts/new" component={CreateNewPost} />
            <Route exact path="/posts/:postId" component={ShowOnePost} />
            <Route exact path="/posts/:postId/edit" component={EditOnePost} />
            <Route exact path="/static/:page" render={(props) => (<StaticContent {...props} />
  )}
/>
            <SideBar />
          </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App