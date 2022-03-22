import authService from "../../services/authService.js";
import { detailsTemplate } from "./detailsTemplate.js";

async function deleteHandler(context, id) {
    const confirmation = confirm('Are you sure you want to delete this furniture?');

    if(confirmation === true){
        authService.deleteFurniture(id);
        context.page.redirect('/dashboard');
    }
}

async function getView(context){
    const id = context.params.id;
    const boundDeleteHandler = deleteHandler.bind(null, context, id);
    const furniture = await authService.getFurniture(id);
    furniture.img = furniture.img.startsWith('.') ? furniture.img.substring(1) : furniture.img;
    const templateResult = detailsTemplate(furniture, boundDeleteHandler);
    context.renderView(templateResult);

}

export default {
    getView
}