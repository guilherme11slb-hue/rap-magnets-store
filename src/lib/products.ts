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
  { id: "p1", name: "King Shades", tagline: "Cap & chain energy", era: "West Coast", price: 8.99, image: m1 },
  { id: "p2", name: "Mic Drop", tagline: "Dreads & melodies", era: "Atlanta", price: 8.99, image: m2 },
  { id: "p3", name: "Crown Heart", tagline: "Queen of the booth", era: "New York", price: 9.99, image: m3 },
  { id: "p4", name: "Beanie Beats", tagline: "Headphones on, world off", era: "Detroit", price: 8.99, image: m4 },
  { id: "p5", name: "Star Face", tagline: "Tatted & toothy", era: "Florida", price: 9.99, image: m5 },
  { id: "p6", name: "Bandana Cash", tagline: "Money on the mind", era: "Houston", price: 8.99, image: m6 },
  { id: "p7", name: "Wild Hair", tagline: "Color in a B&W world", era: "SoundCloud", price: 9.99, image: m7 },
  { id: "p8", name: "OG Boombox", tagline: "Old-school royalty", era: "Old School", price: 11.99, image: m8 },
];