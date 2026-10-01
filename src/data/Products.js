import coffeeOne from '../assets/figma/coffee-1.png';
import coffeeTwo from '../assets/figma/coffee-2.png';
import coffeeThree from '../assets/figma/coffee-3.png';
import coffeeFour from '../assets/figma/coffee-4.png';

export const coffeeProducts = [
  {
    id: 'caffe-mocha',
    name: 'Caffe Mocha',
    description: 'Deep Foam',
    price: 4.53,
    rating: 4.8,
    reviews: 230,
    image: coffeeOne,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    description: 'Silky Milk',
    price: 4.25,
    rating: 4.7,
    reviews: 184,
    image: coffeeTwo,
  },
  {
    id: 'caramel-latte',
    name: 'Caramel Latte',
    description: 'Sweet Caramel',
    price: 4.85,
    rating: 4.9,
    reviews: 312,
    image: coffeeThree,
  },
  {
    id: 'americano',
    name: 'Americano',
    description: 'Rich & Smooth',
    price: 3.75,
    rating: 4.6,
    reviews: 147,
    image: coffeeFour,
  },
  {
    id: 'vanilla-cappuccino',
    name: 'Vanilla Cappuccino',
    description: 'Vanilla Cream',
    price: 4.65,
    rating: 4.8,
    reviews: 205,
    image: coffeeOne,
  },
  {
    id: 'double-espresso',
    name: 'Double Espresso',
    description: 'Bold Roast',
    price: 3.95,
    rating: 4.7,
    reviews: 268,
    image: coffeeFour,
  },
];

export const featuredProduct = coffeeProducts[0];

export function formatPrice(price) {
  return `${price.toFixed(2).replace('.', ',')} €`;
}
