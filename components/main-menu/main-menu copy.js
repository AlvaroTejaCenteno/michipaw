class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Crear el shadow DOM
    }

    async connectedCallback() {
        try {
            // Obtener la URL dinámica del fichero html para el fetch
            const currentScriptUrl = import.meta.url;
            const currentDirectory = new URL(".", currentScriptUrl).href;
            const htmlTemplatePath = `${currentDirectory}main-menu.html`;

            // Usamos fetch para cargar el template HTML
            const response = await fetch(htmlTemplatePath);
            const templateHtml = await response.text(); // Obtener el contenido HTML como texto

            // Crear un template y cargar el contenido HTML obtenido
            const template = document.createElement("template");
            template.innerHTML = templateHtml; // Asignar el contenido HTML al template

            // Clonar el contenido del template y añadirlo al shadow DOM
            const clone = template.content.cloneNode(true);
            this.shadowRoot.appendChild(clone);
        } catch (error) {
            console.error("Error loading main menu template:", error);
        }
    }
}

customElements.define("main-menu", MainMenu); // Definir el Web Component
