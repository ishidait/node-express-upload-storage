/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from 'express';
// import * as ItemService from "./items.service";
// import { Item } from "./item.interface";
// import { Items } from "./items.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items/
itemsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items = [
      { id: 1, name: 'MacBook Pro 2016' },
      { id: 2, name: 'MacBook Air 2018 8GB RAM' },
      { id: 3, name: 'MacBook 2020 8GB RAM, 512GB' },
      { id: 4, name: 'Magic Keyboad English' },
      { id: 5, name: 'Magic Mouse' },
      { id: 6, name: 'Magic Trackpad 2' },
    ];

    res.status(200).send(items);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET items/:id

// POST items/

// PUT items/

// DELETE items/:id
