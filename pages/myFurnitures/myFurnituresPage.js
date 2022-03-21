import authService from "../../services/authService.js";
import { myFurnituresTemplate } from "./myFurnituresTemplate.js";

async function getView(context) {
    const furnitures = await authService.getUserFurnitures();
    const templateResult = myFurnituresTemplate(furnitures);
    context.renderView(templateResult);
}

export default {
    getView,
};
