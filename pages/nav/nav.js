import authService from "../../services/authService.js";
import { navTemplate } from "./navTemplate.js";

function getView(context, next) {
    const navInfo = {
        currentPage: context.pathname,
        isLoggedIn: authService.isLoggedIn(),
    };

    const templateResult = navTemplate(navInfo);
    context.renderNav(templateResult);
    next();
}

export default {
    getView,
};
