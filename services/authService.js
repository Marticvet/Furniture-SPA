import page from "../node_modules/page/page.mjs";

const BASE_DATA_URL = "http://localhost:3030/users";

function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}

function setUserToken(token) {
    localStorage.setItem("token", token);
}

function setUserId(userId) {
    localStorage.setItem("userId", userId);
}

function getUserToken() {
    return localStorage.getItem("token");
}

function getUserId() {
    return localStorage.getItem("userId");
}

async function loginUser(user) {
    try {
        const loginUser = await fetch(`${BASE_DATA_URL}/login`, {
            headers: { "Content-Type": "application/json" },
            method: "Post",
            body: JSON.stringify(user),
        });

        if (!loginUser.ok) {
            alert("Email or password is invalid!");
            page.redirect("login");
            return;
        }
        const loggedInUser = await loginUser.json();
        setUserToken(loggedInUser.accessToken);
        setUserId(loggedInUser._id);
    } catch (err) {
        throw new Error(err);
    }
}

async function registerUser(user) {
    try {
        const createUser = await fetch(`${BASE_DATA_URL}/register`, {
            headers: { "Content-Type": "application/json" },
            method: "Post",
            body: JSON.stringify(user),
        });

        if (!createUser.ok) {
            alert("A user with the same email already exists");
            page.redirect("register");
            return;
        }

        const newUser = await createUser.json();
        setUserToken(newUser.accessToken);
        setUserId(newUser._id);
    } catch (err) {
        throw new Error(err);
    }
}

async function logout() {
    try {
        await fetch(`${BASE_DATA_URL}/logout`, {
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": getUserToken(),
            },
            method: "Get",
        });

        localStorage.clear();
    } catch (err) {
        throw new Error(err);
    }
}

const BASE_FURNITURE_URL = "http://localhost:3030/data/catalog";

async function getAllFurnitures() {
    const getFurnitures = await fetch(BASE_FURNITURE_URL);
    const getResponse = await getFurnitures.json();
    return getResponse;
}

async function getFurniture(id) {
    const getFurnitureResponse = await fetch(`${BASE_FURNITURE_URL}/${id}`);
    return await getFurnitureResponse.json();
}

async function getUserFurnitures() {
    const userId = getUserId();
    const getFurnitures = await fetch(
        `${BASE_FURNITURE_URL}/catalog?where=_ownerId%3D%22${userId}%22`
    );
    return await getFurnitures.json();
}

async function createFurniture(furniture) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = getUserToken();

        const options = {
            headers,
            method: "POST",
            body: JSON.stringify(furniture),
        };
        const createdFurniture = await fetch(BASE_FURNITURE_URL, options);

        if (!createdFurniture.ok) {
            alert("Something went wrong! Please try again.");
            page.redirect("create");
            return;
        }

        await createdFurniture.json();
    } catch (err) {
        throw new Error(err);
    }
}

async function editFurniture(furniture, id) {
    try {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["X-Authorization"] = getUserToken();

        const options = {
            headers,
            method: "Put",
            body: JSON.stringify(furniture),
        };
        const editedFurniture = await fetch(
            `${BASE_FURNITURE_URL}/${id}`,
            options
        );

        const editedResult = await editedFurniture.json();
        if (!editedFurniture.ok) {
            alert("Something went wrong! Please try again.");
            return;
        }
        return editedResult;
    } catch (err) {
        throw new Error(err);
    }
}

async function deleteFurniture(id) {
    try {
        const headers = {};
        headers["X-Authorization"] = getUserToken();

        const options = {
            headers,
            method: "Delete",
        };
        const deletedFurniture = await fetch(
            `${BASE_FURNITURE_URL}/${id}`,
            options
        );

        if (!deletedFurniture.ok) {
            page.redirect("/dashboard");
            return;
        }
    } catch (err) {
        throw new Error(err);
    }
}

export default {
    isLoggedIn,
    getAllFurnitures,
    registerUser,
    logout,
    loginUser,
    getUserId,
    getFurniture,
    getUserFurnitures,
    editFurniture,
    createFurniture,
    deleteFurniture,
};
