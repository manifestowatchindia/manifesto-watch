import React from "react";
import Header from "./component/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="pt-5 mt-5">
        {/* Your main content */}
        <div className="container mt-5 pt-5">
          <h1>Welcome to Manifesto Watch</h1>
          <p>Tracking promises, reporting facts.</p>
        </div>
      </main>
    </>
  );
};

export default App;
