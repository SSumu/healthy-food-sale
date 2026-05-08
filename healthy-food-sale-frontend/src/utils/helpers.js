// Format Currency
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Rs. 0.00";
  }

  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Capitalize First Letter
export const capitalize = (text) => {
  if (!text || typeof text !== "string") return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Truncate Long Text
export const truncateText = (text, maxLength = 50) => {
  if (!text || typeof text !== "string") return "";

  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Format Date
export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Debounce Function
export const debounce = (func, delay = 500) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Generate Random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// Filter Products by Search
export const filterProducts = (products, query) => {
  if (!query) return products;

  return products.filter((product) => {
    product.name.toLowerCase().includes(query.toLowerCase());
  });
};

// Sort Products
export const sortProducts = (products, sortType = "name-asc") => {
  const sortedProducts = [...products];

  switch (sortType) {
    case "price-low-high":
      return sortedProducts.sort((a, b) => a.price - b.price);

    case "price-high-low":
      return sortedProducts.sort((a, b) => b.price - a.price);

    case "name-desc":
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

    case "name-asc":
    default:
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
};

// Validate Image URL
export const isValidImageUrl = (url) => {
  return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(url);
};

// Get Stock Status
export const getStockStatus = (quantity) => {
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= 5) return "Low Stock";

  return "In Stock";
};

// Local Storage Helpers
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);

  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
