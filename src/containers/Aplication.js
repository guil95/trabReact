import React, { Component } from 'react';
import { Button, View, Text, Modal, Dimensions, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import SearchBar from 'react-native-search-bar'

const style = {
  card : {
    backgroundColor : '#fff',
    width: Dimensions.get('window').width - 20,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    elevation: 50,
    borderRadius: 2,
    image : {
      width: Dimensions.get('window').width - 20,
      height: 200
    },
    info: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 10,
      position: 'absolute',
      width : Dimensions.get('window').width - 20,
      bottom: 0,
      name: {
        color: '#fff',
        fontSize: 18
      },
      address : {
        color: '#ccc',
        fontSize: 12
      }
    }
  },
  loading: {
    padding: 20
  },
  result : {
    paddingTop: 10,
    textAlign: 'center',
    color: '#9a9a9a'
  }
}

export class Home extends Component {
  constructor (props) {
    super(props)
    this.apikey = KEY_API
    this.apiUri = URL_API
  }

  static navigationOptions = {
    title: 'Google Places',
  };
  state = { locations : []}

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
      var initialPosition = JSON.stringify(position);
      this.setState({initialPosition});
      }, (error) => alert(error.message), {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
    });
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchID);
  }

  setLocations ( locations ) {
    console.log( JSON.stringify( locations ) )
    this.setState( { locations : locations, isLoading : false } )
  }

  searchlocation ( ) {
    this.setState( { isLoading : true } )
    const url = `${this.apiUri}/textsearch/json?query=${this.state.search}&location=${this.latitude},${this.longitude}&key=${this.apikey}`
    console.log( url )
    let self = this
    axios.get( url )
      .then( (response) => {
        self.setLocations( response.data.results )
      }
    )
  }

  reset () {
    this.setState( { locations : [], isLoading : false } )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
    
        <SearchBar
          ref='searchBar'
          placeholder='Search'
          onChangeText={(search) => this.setState({search})}
          onSearchButtonPress={ () => this.searchlocation()}
          value={ this.state.search }
        />

        { this.state.locations.length > 0 ? <Text style={ style.result }>{ this.state.locations.length } Resultados</Text> : null }

        { this.state.isLoading ? 
          <ActivityIndicator style={ style.loading }/>
          :
          this.state.locations.map( ( location, index ) => {
            return (
              <TouchableOpacity 
                onPress={() => navigate('Location', location ) }
                key={ index } 
                style={ style.card }
              >
                <Image
                  style={ style.card.image }
                  source={{uri: `${this.apiUri}/photo?maxwidth=400&photoreference=${location.photos[0].photo_reference}&key=${this.apikey}` }}
                />
                <View style={ style.card.info }>
                  <Text style={ style.card.info.name }> { location.name } </Text>
                  <Text style={ style.card.info.address }> { location.formatted_address } </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    );
  }
}