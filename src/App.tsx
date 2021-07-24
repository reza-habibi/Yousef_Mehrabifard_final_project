import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TopHeader from "./components/Header/TopHeader";

function App() {
  return (
    <Router>
      <TopHeader/>      
      <Header />
      <main className="bg-gray-200 ">
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
