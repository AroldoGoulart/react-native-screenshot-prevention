![](https://img.shields.io/bundlephobia/min/react-native-screenshot-prevention)
# react-native-screenshot-prevention

A simple implementation of FLAG_SECURE in Android and ScreenShieldKit to IOS for prevent screenshots

## Installation

```sh
npm install react-native-screenshot-prevention
```

### iOS

```sh
cd ios && pod install
```

## Usage

```js
import { allowScreenCapture, preventScreenCapture } from "react-native-screenshot-prevention";

// Enable screenshot (android only)
allowScreenCapture()

//Disable screenshot (android only)
preventScreenCapture()


useEffect(() => {
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
