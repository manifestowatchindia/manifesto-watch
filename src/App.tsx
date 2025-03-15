import React from "react";
import Header from "./components/Header";
import Contact from "./components/ContactPage";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main className="main-content" style={{ flex: 1, marginTop: "70px", paddingTop: "20px" }}>
        <Contact/>
      </main>
      <Footer />
    </div>
  );
};

export default App;
