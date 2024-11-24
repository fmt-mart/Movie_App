import AppNavigation from "./navigation/appNavigation";
import { AppProvider } from "./components/context";
import "react-native-gesture-handler";
import "react-native-reanimated";
export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}
