import React, { memo } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';

import { SPACER } from '../../constants';
import styles from './styles';

interface LoaderProps {
  height?: number;
  width?: number;
}

function Loader(props: LoaderProps): React.ReactElement {
  const {
    height,
    width,
  } = props;

  const rotateValue = new Animated.Value(0);

  const rotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // const viewStyle = useAnimatedStyle(() => ({
  //   transform: [{
  //     rotate: rotateData,
  //   }],
  // }));

  return (
    <Animated.View
      style={[
        styles.container,
      ]}
    >
      <Svg
        fill="none"
        height={height}
        width={width}
        viewBox="0 0 512 512"
      >
        <Path
          clipRule="evenodd"
          d="M4.686 244.685c-6.248 6.248-6.248 16.379 0 22.627l239.999 239.999c6.248 6.249 16.379 6.249 22.627 0l239.999-239.999c6.249-6.248 6.249-16.379 0-22.627L267.312 4.686c-6.248-6.248-16.379-6.248-22.627 0L4.686 244.685Zm186.015-57.984a4 4 0 0 0-4 4V321.98a4 4 0 0 0 4 4H321.98a4 4 0 0 0 4-4V190.701a4 4 0 0 0-4-4H190.701Z"
          fill="#2244FF"
          fillRule="evenodd"
        />
      </Svg>
    </Animated.View>
  );
}

Loader.defaultProps = {
  height: SPACER * 8,
  width: SPACER * 8,
};

export default memo(Loader);
