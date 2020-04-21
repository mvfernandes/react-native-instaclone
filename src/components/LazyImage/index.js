import React from 'react';
import { Animated } from 'react-native';
import { Small, ImageOriginal } from './style';

const ImageOriginalAnimated = Animated.createAnimatedComponent(ImageOriginal);

const LazyImage = ({
    smallSource,
    source,
    aspectRatio,
    shouldLoad
}) => {
    const opacity = new Animated.Value(0);

    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (shouldLoad) {
            setLoaded(true);
        }
    }, [shouldLoad])

    const handleAnimate = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Small
            source={smallSource}
            ratio={aspectRatio}
            resizeMode="contain"
            blurRadius={2}
        >
            {loaded &&
                <ImageOriginalAnimated
                    style={{ opacity }}
                    source={source}
                    ratio={aspectRatio}
                    resizeMode="contain"
                    onLoadEnd={handleAnimate}
                />}
        </Small>
    )
}

export default LazyImage;