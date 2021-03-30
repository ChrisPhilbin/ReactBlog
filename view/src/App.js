import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home'
import Posts from './components/ShowAllPosts'
import ShowOnePost from './components/ShowOnePost';

const App = () => {
  return(
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:postId" component={ShowOnePost} />
        </Switch>
    </Router>
  )
}

export default App