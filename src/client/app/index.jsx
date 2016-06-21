import React from 'react';
import {render} from 'react-dom';
import EcolesList from './EcolesList.jsx';
import Rebase from 're-base';

var base = Rebase.createClass('https://trouve-mon-ecole.firebaseio.com/trouve-mon-ecole');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true
    }
  }

  componentDidMount() {
      this.ref = base.syncState('ecoles', {
          context: this,
          state: 'list',
          asArray: true,
          then() {
              this.setState({loading: false})
          }
      });
  }
  componentWillUnmount() {
      base.removeBinding(this.ref);
  }

  render () {
    return (
      <div>
      <p> Hello React!</p>
      <EcolesList/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
