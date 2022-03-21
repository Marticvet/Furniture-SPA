import authService from "../../services/authService.js";
import { loginTemplate } from "./loginTemplate.js";

async function submitHandler(context, event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    if (email.trim().length === 0 || password.trim().length === 0) {
        form.reset();
        alert("Input field(s) cannot be empty!");
        return;
    }

    const user = {
        email,
        password,
    };

    form.reset();

    authService.loginUser(user);
    context.page.redirect("dashboard");
}

function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);
    const form = {
        submitHandler: boundSubmitHandler,
    };
    const templateResult = loginTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
};
