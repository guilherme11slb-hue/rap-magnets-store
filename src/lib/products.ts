import m1 from "@/assets/magnet-1.jpg";
import m2 from "@/assets/magnet-2.jpg";
import m3 from "@/assets/magnet-3.jpg";
import m4 from "@/assets/magnet-4.jpg";
import m5 from "@/assets/magnet-5.jpg";
import m6 from "@/assets/magnet-6.jpg";
import m7 from "@/assets/magnet-7.jpg";
import m8 from "@/assets/magnet-8.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  era: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Travis Scott", tagline: "Nirvana tee, iced out", era: "Houston", price: 8.99, image: m1 },
  { id: "p2", name: "J. Cole — Mic", tagline: "Dreamville on the mic", era: "North Carolina", price: 8.99, image: m2 },
  { id: "p3", name: "J. Cole — Stage", tagline: "Pointing to the crowd", era: "North Carolina", price: 9.99, image: m3 },
  { id: "p4", name: "Lil Wayne", tagline: "Shades & a styrofoam cup", era: "New Orleans", price: 9.99, image: m4 },
  { id: "p5", name: "Travis Scott", tagline: "Cactus Jack classic", era: "Houston", price: 8.99, image: m5 },
  { id: "p6", name: "J. Cole — Mic", tagline: "Dreamville energy", era: "North Carolina", price: 8.99, image: m6 },
  { id: "p7", name: "J. Cole — Stage", tagline: "Live show vibes", era: "North Carolina", price: 9.99, image: m7 },
  { id: "p8", name: "Lil Wayne", tagline: "Weezy F. forever", era: "New Orleans", price: 11.99, image: m8 },
];