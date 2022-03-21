import authService from "../../services/authService.js";
import { editPageTemplate } from "./editPageTemplate.js";

let form = undefined;

async function submitHandler(context, id, event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    form.invalidFields = {};

    const make = formData.get("make");
    const model = formData.get("model");
    const year = Number(formData.get("year"));
    const description = formData.get("description");
    const price = Number(formData.get("price"));
    const img = formData.get("img");
    const material = formData.get("material");

    if (make.trim().length < 4) {
        form.invalidFields.make = true;
    }

    if (model.trim().length < 4) {
        form.invalidFields.model = true;
    }

    if (year < 1950 || year > 2050) {
        form.invalidFields.year = true;
    }

    if (description.trim().length < 10) {
        form.invalidFields.description = true;
    }

    if (price < 0) {
        form.invalidFields.price = true;
    }

    if (!img.trim().length > 0) {
        form.invalidFields.img = true;
    }

    if (Object.keys(form.invalidFields).length > 0) {
        const templateResult = editPageTemplate(form);
        return context.renderView(templateResult);
    }
    event.target.reset();

    const editedFurniture = {
        make,
        model,
        year,
        price,
        description,
        img,
        material,
    };

    await authService.editFurniture(editedFurniture, id);
    context.page.redirect("/dashboard");
}

async function getView(context) {
    const id = context.params.id;
    const boundSubmitHandler = submitHandler.bind(null, context, id);
    const furniture = await authService.getFurniture(id);

    form = {
        submitHandler: boundSubmitHandler,
        values: {
            make: furniture.make,
            model: furniture.model,
            year: furniture.year,
            description: furniture.description,
            price: furniture.price,
            img: furniture.img,
            material: furniture.material,
        },
        invalidFields: {},
    };

    const templateResult = editPageTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
};
