import "./App.css";
import AuthInitializer from "./components/auth/AuthInitializer";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <AuthInitializer>
      <AppRouter />
    </AuthInitializer>
  );
}
