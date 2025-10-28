import { createRoot } from "react-dom/client";
import App from "./client/src/App";
import "./index.css";
import { initializeTestData } from "./client/src/lib/initTestData";

// Initialize test data on first load
initializeTestData();

createRoot(document.getElementById("root")!).render(<App />);
