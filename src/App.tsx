import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import CatContainer from "./components/CatContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <div className="cat-wrapper">
          <CatContainer />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
