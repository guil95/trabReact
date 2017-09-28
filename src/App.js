import { StackNavigator } from 'react-navigation'
import { Aplication } from './containers/Aplication'
import { Image } from './containers/Image'

const App = StackNavigator({
  Home: { screen: Home },
  Location: { screen: Location }
});

export default App;