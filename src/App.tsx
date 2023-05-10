import React from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppStyle from './App.module.css'
function App() {
  return (
    <div className="App">
      <Header/>
      <main className={AppStyle.main}></main>
      <Footer/>
    </div>
  );
}

export default App;
