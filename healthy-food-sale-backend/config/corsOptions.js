const allowedOrigins = [
  "http://localhost:5173/",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  // allow requests with no origin (like mobile apps, curl, postman)
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/auth headers
  optionsSuccessStatus: 200,
};

export default corsOptions;
