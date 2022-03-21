import { html } from "../../node_modules/lit-html/lit-html.js";
import { furnitureTemplate } from "../shared/furnuturesTemplate.js";

export const allFurnituresTemplate = (furnitures) => html` <div
        class="row space-top"
    >
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${furnitures.map((f) => furnitureTemplate(f))}
    </div>`;
