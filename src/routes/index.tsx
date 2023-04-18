import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../pages/Favorites';
import { StackRoutes } from './StackRoutes';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export function Routes(){
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // ele tira o Header
        tabBarHideOnKeyboard: true, // qnd abrir o teclado ele sai da tela
        tabBarShowLabel: false, // o nome da navegacao
        tabBarActiveTintColor: '#121212', // qnd ativo muda de cor

        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
               return <Ionicons name="home" color="#000" size={size} />
            }
            return <Ionicons name="home-outline" color={color} size={size} />
          }
        }}
        />
      <Tab.Screen
        name="Favorities"
        component={Favorites}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return <Ionicons name="heart" color="#FF4141" size={size} />
            }
            return <Ionicons name="heart-outline" color={color} size={size} />
          }
        }}
        /> 
    </Tab.Navigator>
  )
}