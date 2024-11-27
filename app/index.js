import SignStack from "./navigation/appNavigation";
import { AppProvider } from "./components/context";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { useContext, useEffect, useState } from "react";
import SplashScreen from "../app/screens/SplashScreen";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  }, []);

  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <AppProvider>
      <SignStack />
    </AppProvider>
  );
}
