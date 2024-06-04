import { Router } from "express";
import { addToFavorite, getFavorite, removeFromFavorite } from "../controllers/favorite.controller.js";

const favoriteRouter = Router()

favoriteRouter.route('/')
    .get(getFavorite)

favoriteRouter.route('/:id')
    .post(addToFavorite)
    .delete(removeFromFavorite);






export default favoriteRouter