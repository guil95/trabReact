import React, { Component } from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';

const style = {
  image: {
    width: Dimensions.get('window').width - 20,
    height: 210,
    backgroundImage: '#666'
  },
  info : {
    name: {
      padding: 5,
      textAlign: 'center',
      color: '#666' ,
      fontSize: 26
    },
    address: {
      textAlign: 'center',
      color: '#777'
    }
  },
  card : {
    backgroundColor: '#fff',
    margin: 10,
    paddingBottom: 5
  }
}

export class Location extends Component {
  constructor ( props ) {
    super( props )
    this.state = {}
    this.apikey = KEY_API
    this.apiUri = URL_API
    this.location = this.props.navigation.state.params
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.name,
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={ style.card }>
          <Image
            style={ style.image }
            source={{uri: `${this.apiUri}/photo?maxwidth=400&photoreference=${this.location.photos[0].photo_reference}&key=${this.apikey}` }}
          />
          <View style={ style.info }>
            <Text style={ style.info.name }> { this.location.name } </Text>
            <Text style={ style.info.address }> { this.location.formatted_address}  </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}