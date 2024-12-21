import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const App = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  const getSecondHandRotation = () => {
    return (time.getSeconds() + time.getMilliseconds() / 1000) * 6; // 360 degrees / 60 seconds
  };

  const getMinuteHandRotation = () => {
    return (time.getMinutes() + time.getSeconds() / 60) * 6; // 360 degrees / 60 minutes
  };

  const getHourHandRotation = () => {
    return (time.getHours() % 12 + time.getMinutes() / 60) * 30; // 360 degrees / 12 hours
  };

  return (
    <View style={styles.container}>
      <Svg height="200" width="200">
        <Circle cx="100" cy="100" r="90" stroke="#61dafb" strokeWidth="5" fill="none" />
        <Line
          x1="100"
          y1="100"
          x2={100 + 70 * Math.cos((getSecondHandRotation() - 90) * (Math.PI / 180))}
          y2={100 + 70 * Math.sin((getSecondHandRotation() - 90) * (Math.PI / 180))}
          stroke="#ff0000"
          strokeWidth="2"
        />
        <Line
          x1="100"
          y1="100"
          x2={100 + 50 * Math.cos((getMinuteHandRotation() - 90) * (Math.PI / 180))}
          y2={100 + 50 * Math.sin((getMinuteHandRotation() - 90) * (Math.PI / 180))}
          stroke="#ffffff"
          strokeWidth="4"
        />
        <Line
          x1="100"
          y1="100"
          x2={100 + 30 * Math.cos((getHourHandRotation() - 90) * (Math.PI / 180))}
          y2={100 + 30 * Math.sin((getHourHandRotation() - 90) * (Math.PI / 180))}
          stroke="#ffffff"
          strokeWidth="6"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
});

export default App;