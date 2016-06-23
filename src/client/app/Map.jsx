import React from 'react';

class GMap extends React.Component {
  constructor() {
        super();
        this.state = {
          zoom: 10,
          initialCenter: {lng: 29.9717272 , lat: -90.1056957}
        }

        this._handleGeoPosition = this._handleGeoPosition.bind(this);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this._handleGeoPosition);
        }
    }




  static propTypes() {
  	initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

  _handleGeoPosition (position) {
    console.log(position.coords);
    this.setState({
      initialCenter: {lng: position.coords.longitude, lat: position.coords.latitude}
    });
    this.mapCenter();
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.infoWindow = this.createInfoWindow()

    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    console.log('Create map');
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    console.log('Reload map with ', this.state.initialCenter);
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )

    this.props.initialCenter = this.state.initialCenter;
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
	}

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString
    })
  }

  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }

  render() {
    return <div className="GMap">
      <div className='UpdatedText'>
        <p>Current Zoom: { this.state.zoom } - Current lat/lon {this.state.initialCenter.lat} / {this.state.initialCenter.lng}</p>
      </div>
      <div className='GMap-canvas' ref="mapCanvas">
      </div>
    </div>
  }
}

export default GMap;
