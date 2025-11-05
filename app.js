// Espera a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el Acordeón (Solo en project.html) ---
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling; // El .accordion-content
            const icon = toggle.querySelector('.toggle-icon');

            // Cierra todos los demás items
            accordionToggles.forEach(otherToggle => {
                const otherContent = otherToggle.nextElementSibling;
                if (otherToggle !== toggle && otherContent.classList.contains('active')) {
                    otherContent.classList.remove('active');
                    otherToggle.querySelector('.toggle-icon').textContent = '+';
                }
            });

            // Abre o cierra el item actual
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.textContent = '+';
            } else {
                content.classList.add('active');
                icon.textContent = '−'; // Menos
            }
        });
    });


    // --- Lógica para Cargar Ficha de Proyecto (Solo en project.html) ---
    
    // Verificamos si estamos en la página del proyecto
    if (document.getElementById('project-title')) {
        loadProjectData();
    }

});

/**
 * Esta función SIMULA la carga de datos del backend.
 * Lee el ?id=X de la URL y muestra datos de ejemplo.
 * * En el futuro, aquí es donde harás:
 * fetch(`/api/proyectos/${projectId}`)
 */
function loadProjectData() {
    // 1. Obtener el ID del proyecto desde la URL
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
        document.getElementById('project-title').textContent = "Error: No se encontró el proyecto.";
        return;
    }

    // 2. Simulación de Base de Datos (Backend)
    // En el futuro, esto vendrá de tu base de datos PostgreSQL.
    const fakeProjectDatabase = {
        "1": {
            title: "Optimización de Flujo de Licencias",
            description: "Un proyecto para reducir el tiempo de espera usando un nuevo modelo de IA para la pre-validación de documentos médicos.",
            leader: "Ana Pérez",
            status: "A2.3 Prototipo",
            statusColor: "#28a745"
        },
        "2": {
            title: "App de Bienestar Funcionario",
            description: "Exploración de una solución móvil para mejorar la salud mental y física de los funcionarios, conectando con servicios y actividades.",
            leader: "Carlos Soto",
            status: "A2.1 Identificación",
            statusColor: "#ffc107"
        },
        "3": {
            title: "Portal de Transparencia Activa",
            description: "Iniciativa para rediseñar el portal de transparencia, haciéndolo más accesible e interactivo para la ciudadanía.",
            leader: "María López",
            status: "Detenido",
            statusColor: "#dc3545"
        }
    };

    // 3. Cargar los datos del proyecto "falso"
    const project = fakeProjectDatabase[projectId];

    if (project) {
        // 4. Llenar el HTML con los datos
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-description').textContent = project.description;
        document.getElementById('project-leader').textContent = project.leader;
        
        const statusBadge = document.getElementById('project-status');
        statusBadge.textContent = project.status;
        statusBadge.style.backgroundColor = project.statusColor;
        // Ajuste de color de texto para badges claros
        if(project.statusColor === "#ffc107") statusBadge.style.color = "#333";

    } else {
        document.getElementById('project-title').textContent = "Proyecto no encontrado";
        document.getElementById('project-description').textContent = "El ID del proyecto no es válido.";
    }
}