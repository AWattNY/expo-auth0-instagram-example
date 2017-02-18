import React from 'react'
import { Font } from 'exponent'
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import SvgUri from 'react-native-svg-uri'


export default class PostItem extends React.Component {

  state = {
    fontLoaded: false,
    width: 0,
    height: 0,
  }

  async componentDidMount() {

    Image.getSize(this.props.imageUrl, (width, height) => {

      const screenWidth = Dimensions.get('window').width

      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor

      this.setState({width: screenWidth, height: imageHeight})
    })

    // load font
    await Font.loadAsync({
      'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  render() {

    const {width, height} = this.state
    const {description, imageUrl, comments, postId} = this.props
    return (
      <TouchableHighlight
        onPress={() => this.props.onSelect({
          'description': description,
          'imageUrl': imageUrl,
          'comments': comments,
          'postId': postId,
        })}
      >
        <View>
          <Image
            style={{width: width, height: height}}
            source={{uri: this.props.imageUrl}}
          />
          {this.state.fontLoaded &&
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {this.props.description}
              </Text>
            </View>
          </View>
          }
        </View>
      </TouchableHighlight>
    )
  }

}

const styles = StyleSheet.create({
  titleContainer: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-light',
    color: 'rgba(0,0,0,.8)',
    fontWeight: '300',
    fontSize: 20,
  },
})

PostItem.propTypes = {
  description: React.PropTypes.string,
  imageUrl: React.PropTypes.string,
  onSelect: React.PropTypes.func,
}