import React from 'react';
import {render} from 'react-dom';
import EcolesList from './EcolesList.jsx';
import Rebase from 're-base';
import GMap from './Map.jsx';

var base = Rebase.createClass('https://trouve-mon-ecole.firebaseio.com/trouve-mon-ecole');

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true,
      initialCenter: {lng: 29.9717272 , lat: -90.1056957}
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
   var initialCenter = { lng: -90.1056957, lat: 29.9717272 }

    return (
      <div>
        <div className="search-box"><input type="text"></input>
          <div>lat: {this.state.initialCenter.lat}, lng: {this.state.initialCenter.lng}</div>
        </div>
        <GMap initialCenter={initialCenter} />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
