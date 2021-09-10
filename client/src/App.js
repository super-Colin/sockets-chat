import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from './context/Context';
import WithConsumer from './context/WithConsumer';

import Chat from './pages/Chat';

const App = (props) => {
  return (
    <BrowserRouter>
      <Provider router={props}>
        {/* <Switch> */}
          <Route exact path="/" component={Chat} />
          <Route exact path="/chat" component={Chat} />
        {/* </Switch> */}

      </Provider>
    </BrowserRouter>
  )
}

export default WithConsumer(App);
