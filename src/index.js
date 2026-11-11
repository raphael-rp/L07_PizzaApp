import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { pizzaData } from './data.js';

const time = new Date().getHours();
const openHour = 10;
const closeHour = 22;
const isOpen = time >= openHour && time < closeHour;


function Header() {
  return <h1 style={{ color: 'orange', fontSize: '48px', textTransform: 'uppercase' }}>Andy's Pizza Co.</h1>;
}

function Pizza({ name, description, price, imageUrl, soldOut}) {
  return (
    <div className={"pizza" + (soldOut ? " sold-out" : "")}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      {soldOut ? <span>SOLD OUT</span> : <span>${price.toFixed(2)}</span>}
    </div>
  );
}

function PizzaList() {
  return (
    <div className="display">
      {pizzaData.map((pizza) => (
        <Pizza
          key={pizza.name}
          name={pizza.name}
          description={pizza.ingredients}
          price={pizza.price}
          imageUrl={pizza.photoName}
          soldOut={pizza.soldOut}
        />
      ))}
    </div>
  )
}

function Menu() {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {isOpen && <p>Authentic Italian Cuisine, all from our stone oven.</p>}
      <PizzaList />
    </div>
  )
}

function Order() {
  return (
    <div>
      <footer className='footer'>We're currently open.</footer>
      <div className='order'>
        <button className='btn'>Order Now</button>
      </div>
    </div>
  )
}

function Closed({ openHour, closeHour }) {
  return (
    <footer className='footer'>We're currently closed. Our working hours are from {openHour}:00am to {closeHour - 12}:00pm.</footer>
  )
}

function Footer() {
  return isOpen ? <Order /> : <Closed openHour={openHour} closeHour={closeHour} />;
}

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
)
