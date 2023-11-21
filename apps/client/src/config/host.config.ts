const host =
  process.env.NODE_ENV === "production"
    ? process.env.HOST
    : "http://localhost:8080";

export { host };
