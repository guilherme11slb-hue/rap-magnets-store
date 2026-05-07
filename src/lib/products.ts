import m1 from "@/assets/magnet-1.png";
import m2 from "@/assets/magnet-2.png";
import m3 from "@/assets/magnet-3.png";
import m4 from "@/assets/magnet-4.png";
import m5 from "@/assets/magnet-5.png";
import m6 from "@/assets/magnet-6.png";
import m7 from "@/assets/magnet-7.png";
import m8 from "@/assets/magnet-8.png";
import m9 from "@/assets/magnet-9.png";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  era: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Travis Scott", tagline: "Supreme & ice", era: "Houston", price: 8.99, image: m1 },
  { id: "p2", name: "Central Cee", tagline: "Smoke & shades", era: "London", price: 8.99, image: m2 },
  { id: "p3", name: "Travis Scott", tagline: "Flames tee, grillz", era: "Houston", price: 9.99, image: m3 },
  { id: "p4", name: "A$AP Rocky", tagline: "Pretty Flacko", era: "New York", price: 9.99, image: m4 },
  { id: "p5", name: "Snoop Dogg", tagline: "Lakers jersey", era: "West Coast", price: 8.99, image: m5 },
  { id: "p6", name: "Snoop Dogg", tagline: "Smoke session", era: "West Coast", price: 8.99, image: m6 },
  { id: "p7", name: "21 Savage", tagline: "Slaughter gang", era: "Atlanta", price: 9.99, image: m7 },
  { id: "p8", name: "J. Cole", tagline: "Dreamville on the mic", era: "North Carolina", price: 11.99, image: m8 },
  { id: "p9", name: "West Coast Legends", tagline: "Dre, Snoop, Cube & Em", era: "West Coast", price: 12.99, image: m9 },
];