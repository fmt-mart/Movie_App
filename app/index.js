import AppNavigation from "./navigation/appNavigation";
import { AppProvider } from "./components/context";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { useEffect, useState } from "react";
import SplashScreen from "../app/screens/SplashScreen";
export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 5000);
  }, []);
  return isShowSplash ? (
    <SplashScreen />
  ) : (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}
