import page from './node_modules/page/page.mjs'
import createPage from './pages/create/createPage.js';
import dashboardPage from './pages/dashboard/dashboardPage.js';
import detailsPage from './pages/details/detailsPage.js';
import editPage from './pages/edit/editPage.js';
import loginPage from './pages/login/loginPage.js';
import myFurnituresPage from './pages/myFurnitures/myFurnituresPage.js';
import nav from './pages/nav/nav.js';
import registerPage from './pages/register/registerPage.js';
import renderMiddleWare from './render/renderMiddleWare.js';
import authService from './services/authService.js';

const app = document.getElementById('application');
const navigation = document.getElementById('navigation');
renderMiddleWare.initialize(app, navigation);

page('/index.html', '/dashboard');
page('/', '/dashboard');

page('/dashboard', renderMiddleWare.decorateContext, nav.getView, dashboardPage.getView);
page('/register', renderMiddleWare.decorateContext, nav.getView, registerPage.getView);
page('/logout', async (context) => {await authService.logout(); context.page.redirect('/dashboard')});
page('/login', renderMiddleWare.decorateContext, nav.getView, loginPage.getView);
page('/details/:id', renderMiddleWare.decorateContext, nav.getView, detailsPage.getView);
page('/my-furniture', renderMiddleWare.decorateContext, nav.getView, myFurnituresPage.getView);
page('/edit/:id', renderMiddleWare.decorateContext, nav.getView, editPage.getView);
page('/create', renderMiddleWare.decorateContext, nav.getView, createPage.getView);

page.start();
