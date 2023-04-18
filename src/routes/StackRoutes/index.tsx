import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../pages/Home';
import Detail from '../../pages/Detail';
import Search from '../../pages/Search';

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          animation: 'simple_push'
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detalhes da receita',
          animation:'fade_from_bottom',
          animationDuration: 30
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Veja o que encontramos'
        }}
      />
    </Stack.Navigator>
  )
}