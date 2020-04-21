import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import logo from '../assets/instagram.png';

import Home from '../screens/Home';
import Feed from '../screens/Feed';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTitle: "Insta Clone",
                        headerStyle: {
                            backgroundColor: '#f5f5f5',
                        }
                    }}
                />

                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        headerTitle: <Image source={logo} />,
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: '#f5f5f5',
                        }
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
}