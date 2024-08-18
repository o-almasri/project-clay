// so we can check for specific countries and dont allow user to set their own 
export const CountryTable = `
CREATE TABLE IF NOT EXISTS countries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE
);
`;

export const CityTable = `
CREATE TABLE IF NOT EXISTS cities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  country_id INTEGER,
  FOREIGN KEY (country_id) REFERENCES countries(id)
);
`;

export const UserTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  email TEXT,
  phonenumber TEXT,
  street TEXT,
  city_id INTEGER,
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
`;

export const EmployeesTable = `
CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        department TEXT,
        position TEXT
      );
`;

//status TEXT -- e.g., 'Pending', 'Shipped', 'Delivered' ,'saved for later'
export const OrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  order_date TEXT,  
  status TEXT,
  total REAL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
`;


export const TextureTable = `
CREATE TABLE IF NOT EXISTS textures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texture_name TEXT UNIQUE
);
`;

export const ItemsTable = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  type TEXT CHECK(type IN ('vase', 'sandvase', 'tshirt')),
  texture_id INTEGER,
  FOREIGN KEY (texture_id) REFERENCES textures(id),
  cost REAL
);
`;

export const LayersTable = `
CREATE TABLE IF NOT EXISTS layers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER,
    layer_number INTEGER,
    width REAL,
    height REAL,
    FOREIGN KEY (item_id) REFERENCES items(id)
  );
`;

export const TshirtOptionsTable = `
CREATE TABLE IF NOT EXISTS tshirtoptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER,
  size TEXT CHECK(size IN ('S', 'M', 'L', 'XL')),
  texture_id INTEGER,
  FOREIGN KEY (item_id) REFERENCES items(id)
);
`;

export const OrderItems = `
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER,
  item_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);
`;