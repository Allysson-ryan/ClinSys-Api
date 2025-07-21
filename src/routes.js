import { Router } from "express";

const router = Router();

// Exemplo temporário só pra não dar erro
router.get("/", (req, res) => {
  res.send("API ClinSys funcionando! 🚀");
});

export default router;
