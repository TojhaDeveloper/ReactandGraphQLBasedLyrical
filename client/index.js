import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider } from 'react-apollo';
import App from './components/App';
import SongList from './components/songlist';
import SongCreate from './components/songCreate';
import SongDetail from './components/songDetail';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

const client = new ApolloClient({
  dataIdFromObject : o => o.id
});
const Root = () => {
  return (
  <ApolloProvider client = {client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
       <IndexRoute component={SongList}/>
       <Route path="/songs/new" component={SongCreate}/>
       <Route path="/songs/:id" component={SongDetail}/>
      </Route>
    </Router>
  </ApolloProvider>);
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
