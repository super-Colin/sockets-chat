import React from 'react';
import { Consumer } from './Context';

function WithConsumer(WrappedComponent){
  return props => {
    return (
      <Consumer>
        { ctx => <WrappedComponent {...props} context={ctx} /> }
      </Consumer>
    )  
  }
}

export default WithConsumer;
