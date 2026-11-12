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

function Pizza({ name, description, price, imageUrl, soldOut, isPopular }) {
  return (
    <div className={"pizza" + (soldOut ? " sold-out" : "")}>
      <img src={imageUrl} alt={name} />
      <div>
        <h3>{name} {isPopular && !soldOut && <span className="badge">Chef's Pick</span>}</h3>
        <p>{description}</p>
        {soldOut ? <span>SOLD OUT</span> : <span>${price.toFixed(2)}</span>}
      </div>
    </div>
  );
}

function PizzaSection({ title, pizzas }) {
  return (
    <div className="pizza-section">
      <h2>{title}</h2>
      <div className="display">
        {pizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            description={pizza.ingredients}
            price={pizza.price}
            imageUrl={pizza.photoName}
            soldOut={pizza.soldOut}
            isPopular={pizza.isPopular}
            category={pizza.category}
          />
        ))}
      </div>
    </div>
  )
}

function Menu() {
  const numOfPizzas = pizzaData.length;
  const vegPizzas = pizzaData.filter(pizza => pizza.category === "vegetarian");
  const meatPizzas = pizzaData.filter(pizza => pizza.category === "meat");

  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {isOpen && <p>Authentic Italian Cuisine, all from our stone oven.</p>}
      {numOfPizzas > 0 ? (
        <div className="pizza-sections">
          <PizzaSection title="Vegetarian" pizzas={vegPizzas} />
          <PizzaSection title="Meat Lovers" pizzas={meatPizzas} />
        </div>
      ) : (
        <p>We're still working on our menu. Please come back later.</p>
      )}
    </div>
  )
}

function Order({openHour, closeHour}) {
  return (
    <div>
      <footer className='footer'>We're open until {closeHour - 12}:00pm. Come visit us or order online.</footer>
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
  return isOpen ? <Order openHour={openHour} closeHour={closeHour} /> : <Closed openHour={openHour} closeHour={closeHour} />;
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
