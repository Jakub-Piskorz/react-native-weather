import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/main-screen';
import { withExpoSnack } from 'nativewind';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withExpoSnack(App);
// TailwindCSS doesn't work on web, until I wrap App with this snack.
// In console there is some fetch error but it works anyway.
// I have no idea what's going on, but that's the only way I can debug styles.
