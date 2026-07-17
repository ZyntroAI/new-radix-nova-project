import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

router.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

router.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

export default router;
