import winston from "winston";
import morgan from "morgan";

// Get env variables
const level = process.env.LOG_LEVEL || "info";
const isProduction = process.env.NODE_ENV === "production";

// Winston Logger Setup
const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }),
  ),
  transports: [
    // Log errors separately
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // Log all logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
});

// Console logging in development only
if (!isProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Morgan Middleware
const stream = {
  write: (message) => logger.info(message.trim()),
};

const morganMiddleware = morgan(isProduction ? "combined" : "dev", { stream });

export { logger, morganMiddleware };
