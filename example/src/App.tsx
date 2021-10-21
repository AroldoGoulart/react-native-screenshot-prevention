import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { allowScreenCapture, preventScreenCapture, addScreenshotListener } from 'react-native-screenshot-prevention';

export default function App() {
  const [screenshotEnabled, setScreenshotEnabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Function to execute when user did a screenshot(ios only)
    const onScreenshot = () => {
      console.log("Hey, screenshot detected!")
    }

    // Its important have and "unsubcribe" to remove listener from screen is dismonted
    const unsubscribe = addScreenshotListener(onScreenshot);

    return () => {
      unsubscribe()
    }
  }, [])


  const onChange = (nextStage: boolean): void => {
    setScreenshotEnabled(nextStage)
    if (nextStage) {
      allowScreenCapture()
    }
    else {
      preventScreenCapture()
    }
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={() => onChange(true)}
        style={[styles.touchable, { backgroundColor: '#6eff61' }]}
      >
        <Text>
          Enable
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChange(false)}
        style={[styles.touchable, { backgroundColor: '#d9326c' }]}
      >
        <Text>
          Disable
        </Text>
      </TouchableOpacity>

      <Text>
        Screenshot enabled: {screenshotEnabled}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
});
