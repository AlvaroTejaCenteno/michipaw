class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Crear el shadow DOM
    }

    async connectedCallback() {
        try {
            // Obtener la URL dinámica del fichero html y css para el fetch
            const currentScriptUrl = import.meta.url;
            const currentDirectory = new URL(".", currentScriptUrl).href;
            const htmlTemplatePath = `${currentDirectory}main-menu.html`;
            const cssTemplatePath = `${currentDirectory}main-menu.css`;

            // Usamos fetch para cargar el template HTML
            const response = await fetch(htmlTemplatePath);
            const templateHtml = await response.text(); // Obtener el contenido HTML como texto

            // Crear un template y cargar el contenido HTML obtenido
            const template = document.createElement("template");
            template.innerHTML = templateHtml; // Asignar el contenido HTML al template

            // Clonar el contenido del template y añadirlo al shadow DOM
            const clone = template.content.cloneNode(true);
            this.shadowRoot.appendChild(clone);

            // Agregar el archivo CSS dinámicamente al shadow DOM
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssTemplatePath; // Ruta dinámica del CSS
            this.shadowRoot.appendChild(link);

            // Ahora que el contenido está en el shadow DOM, agregamos los event listeners
            this.addEventListeners();
        } catch (error) {
            console.error("Error loading main menu template:", error);
        }
    }
    addEventListeners() {
        // Seleccionamos los botones dentro del shadow DOM
        const buttons = this.shadowRoot.querySelectorAll("button");

        // Agregamos el evento de clic para cada botón
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const sectionToShow = button.getAttribute("data-section");
                console.log(`Se ha clickeado el botón: ${sectionToShow}`);

                // Lógica para manejar la clase "selected"
                this.updateSelectedButton(button);

                // Gestionar las secciones relacionadas
                this.toggleSections(sectionToShow);
            });
        });
    }

    updateSelectedButton(clickedButton) {
        // Seleccionamos todos los botones dentro del shadow DOM
        const buttons = this.shadowRoot.querySelectorAll("button");

        // Eliminamos la clase "selected" de todos los botones
        buttons.forEach((button) => {
            button.classList.remove("selected");
        });

        // Agregamos la clase "selected" al botón clickeado
        clickedButton.classList.add("selected");
    }

    toggleSections(sectionToShow) {
        // Selecciona todas las secciones fuera del Web Component
        const sections = document.querySelectorAll("#michipaws-section, #bounties-section, #contacts-section, #activity-section");

        // Oculta todas las secciones
        sections.forEach((section) => {
            section.classList.add("display-none");
        });

        // Muestra la sección correspondiente
        const section = document.querySelector(`#${sectionToShow}-section`);
        if (section) {
            section.classList.remove("display-none");
        } else {
            console.warn(`La sección ${sectionToShow}-section no existe.`);
        }

        // Condición para mostrar/ocultar elementos según el botón clickeado
        const bountySelector = document.getElementById("bounties-subsection-selector-container");
        const shapeDivider = document.getElementById("shape-divider");

        if (sectionToShow === "bounties") {
            // Si se hace click en el botón "bounties", muestra el selector de subsección y oculta el shape-divider
            if (bountySelector) {
                bountySelector.classList.remove("display-none");
            }
            if (shapeDivider) {
                shapeDivider.classList.add("display-none");
            }
        } else {
            // Si se hace click en cualquier otro botón, muestra el shape-divider y oculta el selector de subsección de "bounties"
            if (bountySelector) {
                bountySelector.classList.add("display-none");
            }
            if (shapeDivider) {
                shapeDivider.classList.remove("display-none");
            }
        }
    }
}

customElements.define("main-menu", MainMenu); // Definir el Web Component
