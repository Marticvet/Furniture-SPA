import authService from "../../services/authService.js";
import { registerTemplate } from "./registerPageTemplate.js";

async function submitHandler(context, event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("rePass");

    if (
        email.trim().length === 0 ||
        password.trim().length === 0 ||
        rePass.trim().length === 0
    ) {
        form.reset();
        alert("Input field(s) cannot be empty!");
        return;
    }

    if (password !== rePass) {
        alert("Passwords aren't equal!");
        form.reset();
        return;
    }

    const user = {
        email,
        password,
    };

    form.reset();
    authService.registerUser(user);
    context.page.redirect("dashboard");
}

function getView(context) {
    const boundSubmitHandler = submitHandler.bind(null, context);
    const form = {
        submitHandler: boundSubmitHandler,
    };
    const templateResult = registerTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView,
};
