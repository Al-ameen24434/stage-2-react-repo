import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeTestData } from "./lib/initTestData";

// Initialize test data on first load
initializeTestData();

createRoot(document.getElementById("root")!).render(<App />);
