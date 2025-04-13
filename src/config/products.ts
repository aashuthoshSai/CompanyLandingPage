export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  emoji: string;
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "dogs",
    name: "Dog Supplies",
    emoji: "🐶",
    products: [
      { id: "dog-1", name: "Premium Chicken Dog Food (5kg)", price: 24.99, category: "dogs" },
      { id: "dog-2", name: "Squeaky Bone Toy", price: 6.50, category: "dogs" },
      { id: "dog-3", name: "Adjustable Nylon Dog Collar (Medium)", price: 11.75, category: "dogs" },
      { id: "dog-4", name: "Cozy Dog Bed (Medium, Grey)", price: 39.99, category: "dogs" },
      { id: "dog-5", name: "Doggy Raincoat (Waterproof, Red)", price: 18.00, category: "dogs" }
    ]
  },
  {
    id: "cats",
    name: "Cat Supplies",
    emoji: "🐱",
    products: [
      { id: "cat-1", name: "Gourmet Salmon Cat Food (3kg)", price: 19.95, category: "cats" },
      { id: "cat-2", name: "Catnip-Filled Mouse Toy (Pack of 3)", price: 5.25, category: "cats" },
      { id: "cat-3", name: "Cat Tree Tower (4-Levels, Beige)", price: 74.50, category: "cats" },
      { id: "cat-4", name: "Self-Cleaning Litter Box", price: 129.99, category: "cats" },
      { id: "cat-5", name: "Feather Wand Teaser Toy", price: 4.80, category: "cats" }
    ]
  },
  {
    id: "fish",
    name: "Fish & Aquarium",
    emoji: "🐠",
    products: [
      { id: "fish-1", name: "Tropical Fish Flakes (200g)", price: 9.99, category: "fish" },
      { id: "fish-2", name: "10-Gallon Glass Aquarium Kit", price: 69.00, category: "fish" },
      { id: "fish-3", name: "Aquarium Gravel (Blue, 5lb)", price: 6.45, category: "fish" },
      { id: "fish-4", name: "Decorative Castle Ornament", price: 13.25, category: "fish" },
      { id: "fish-5", name: "Water Conditioner Drops", price: 7.35, category: "fish" }
    ]
  },
  {
    id: "birds",
    name: "Bird Supplies",
    emoji: "🐦",
    products: [
      { id: "bird-1", name: "Parakeet Seed Mix (1kg)", price: 6.99, category: "birds" },
      { id: "bird-2", name: "Hanging Bird Cage (Medium)", price: 44.20, category: "birds" },
      { id: "bird-3", name: "Bird Swing Toy", price: 4.10, category: "birds" },
      { id: "bird-4", name: "Cuttlebone (Pack of 2)", price: 3.99, category: "birds" },
      { id: "bird-5", name: "Singing Mirror Toy", price: 5.75, category: "birds" }
    ]
  },
  {
    id: "small-pets",
    name: "Small Pet Supplies",
    emoji: "🐰",
    products: [
      { id: "small-1", name: "Timothy Hay (1.5kg)", price: 8.25, category: "small-pets" },
      { id: "small-2", name: "Hamster Wheel (Silent Spin)", price: 12.90, category: "small-pets" },
      { id: "small-3", name: "Rabbit Hutch (2-Story, Wooden)", price: 94.50, category: "small-pets" },
      { id: "small-4", name: "Guinea Pig Veggie Treats", price: 4.99, category: "small-pets" },
      { id: "small-5", name: "Tunneling Tube (Colorful Plastic)", price: 9.75, category: "small-pets" }
    ]
  },
  {
    id: "reptiles",
    name: "Reptile Supplies",
    emoji: "🐍",
    products: [
      { id: "reptile-1", name: "Heat Lamp with UVB (75W)", price: 18.99, category: "reptiles" },
      { id: "reptile-2", name: "Dried Mealworms (200g)", price: 10.25, category: "reptiles" },
      { id: "reptile-3", name: "Terrarium Decor (Fake Plants & Logs)", price: 15.60, category: "reptiles" },
      { id: "reptile-4", name: "Reptile Carpet Mat (Medium)", price: 8.40, category: "reptiles" },
      { id: "reptile-5", name: "Calcium Powder Supplement", price: 6.15, category: "reptiles" }
    ]
  },
  {
    id: "general",
    name: "General Care & Accessories",
    emoji: "🧼",
    products: [
      { id: "general-1", name: "Pet Shampoo (Aloe & Oatmeal)", price: 7.25, category: "general" },
      { id: "general-2", name: "Flea & Tick Collar", price: 13.99, category: "general" },
      { id: "general-3", name: "Pet Nail Clipper", price: 5.80, category: "general" },
      { id: "general-4", name: "Travel Carrier (Soft-Sided, Medium)", price: 27.45, category: "general" },
      { id: "general-5", name: "Pet ID Tag Engraving", price: 3.00, category: "general" }
    ]
  }
];
