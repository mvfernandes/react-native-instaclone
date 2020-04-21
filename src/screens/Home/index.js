import React from 'react';
import { View, Button } from 'react-native';


const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title="Ver Feed"
                onPress={() => navigation.push('Feed')}
            />
        </View>
    )
}

export default Home;