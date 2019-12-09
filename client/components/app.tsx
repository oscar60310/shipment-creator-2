import * as React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { hot } from 'react-hot-loader/root';
import { Nav } from './nav';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ProductList from './productList';
import CustomerList from './customerList';
import OrderList from './orderList';
import Order from './order';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const LoadResource = (props: { children: any }) => {
  const [finish, setFinish] = React.useState(false);
  React.useEffect(() => {
    const jobs = [
      import('@blueprintjs/core/lib/css/blueprint.css'),
      import('@blueprintjs/datetime/lib/css/blueprint-datetime.css'),
      import('@blueprintjs/select/lib/css/blueprint-select.css')
    ];
    Promise.all(jobs).then(() => setFinish(true));
  }, []);
  return finish ? (
    props.children
  ) : (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      Loading ...
    </div>
  );
};
const AppComponent = () => {
  return (
    <div>
      <LoadResource>
        <ApolloProvider client={client}>
          <Nav />
          <div
            style={{
              padding: 10,
              height: 'calc(100% - 50px)',
              overflow: 'hidden'
            }}
          >
            <Router>
              <Switch>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/customers">
                  <CustomerList />
                </Route>
                <Route path="/order/:id">
                  <Order />
                </Route>
                <Route path="/">
                  <OrderList />
                </Route>
              </Switch>
            </Router>
          </div>
        </ApolloProvider>
      </LoadResource>
    </div>
  );
};
export default hot(AppComponent);
