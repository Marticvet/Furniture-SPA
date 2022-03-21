import authService from "../../services/authService.js";
import { allFurnituresTemplate } from "./dashboardTemplate.js";

async function getView(context) {
    const furnitures = await authService.getAllFurnitures();
    const templateResult = allFurnituresTemplate(furnitures);
    context.renderView(templateResult);
}

export default {
    getView,
};
