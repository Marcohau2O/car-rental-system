import express from "express";
import cors from "cors";

import autoRoutes from "./routes/auto.routes.js";
import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/usuario.routes.js"
import healthRoutes from "./routes/health.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);

app.use("/api/autos", autoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/usuario", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint no encontrado",
  });
});

export default app;