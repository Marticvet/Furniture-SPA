import authService from "../../services/authService.js";
import { createFurnitureTemplate } from "./createPageTemplate.js";

let form = undefined;

async function submitHandler(context, event) {
    event.preventDefault();
    const formData = new FormData(event.target);
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
        const templateResult = createFurnitureTemplate(form);
        return context.renderView(templateResult);
    }

    event.target.reset();

    const createdFurniture = {
        make,
        model,
        year,
        price,
        description,
        img,
        material,
    };

    await authService.createFurniture(createdFurniture);
    context.page.redirect("/dashboard");
}

async function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);

    form = {
        submitHandler: boundSubmitHandler,
        invalidFields: {
            make: true,
            model: true,
            year: true,
            price: true,
            description: true,
            img: true,
        },
    };

    const templateResult = createFurnitureTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
};
