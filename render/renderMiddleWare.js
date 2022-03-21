import { render } from "../node_modules/lit-html/lit-html.js";

let applicationElement = undefined;
let navigationElement = undefined;

function initialize(applicationDomElement, navigationDomElement){
    applicationElement = applicationDomElement;
    navigationElement = navigationDomElement;
}

async function renderView(templateResult){
    render(templateResult, applicationElement);
}

async function renderNav(templateResult){
    render(templateResult, navigationElement);
}

function decorateContext(context, next){
    context.renderView = renderView;
    context.renderNav = renderNav;
    next();
}

export default{
    initialize,
    renderView,
    renderNav,
    decorateContext,
}