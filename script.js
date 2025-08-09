// ---------------------
// Datos de la malla
// ---------------------
const malla = [
    {
        año: 1,
        semestres: [
            {
                nombre: "Primer semestre",
                asignaturas: [
                    "Fundamentos de Matemáticas",
                    "Álgebra",
                    "Matemática Discreta",
                    "Sistemas Digitales",
                    "Programación I"
                ]
            },
            {
                nombre: "Segundo semestre",
                asignaturas: [
                    "Fundamentos Tecnológicos y Físicos de la Informática",
                    "Estadística",
                    "Fundamentos de Computadores",
                    "Programación II",
                    "Cálculo y Análisis Numérico"
                ]
            }
        ]
    },
    {
        año: 2,
        semestres: [
            {
                nombre: "Primer semestre",
                asignaturas: [
                    "Bases de Datos I",
                    "Algoritmos y Estructuras de Datos",
                    "Sistemas Operativos I",
                    "Redes",
                    "Programación Orientada a Objetos"
                ]
            },
            {
                nombre: "Segundo semestre",
                asignaturas: [
                    "Gestión Financiera de Empresas",
                    "Bases de Datos II",
                    "Sistemas Operativos II",
                    "Arquitectura de Computadores",
                    "Computación Gráfica",
                    "Diseño de Software"
                ]
            }
        ]
    },
    {
        año: 3,
        semestres: [
            {
                nombre: "Primer semestre",
                asignaturas: [
                    "Teoría de Autómatas y Lenguajes Formales",
                    "Administración de Sistemas y Redes",
                    "Computación Distribuida",
                    "Inteligencia Artificial"
                ]
            },
            {
                nombre: "Segundo semestre",
                asignaturas: [
                    "Desarrollo de Aplicaciones Web",
                    "Gestión de Proyectos Informáticos",
                    "Compiladores e Intérpretes",
                    "Seguridad de la Información",
                    "Ciberseguridad"
                ]
            }
        ]
    },
    {
        año: 4,
        semestres: [
            {
                nombre: "Primer semestre",
                asignaturas: [
                    "Interacción Persona-Ordenador",
                    "Ingeniería de Computadores",
                    "Trabajo Fin de Grado",
                    "Prácticas Externas"
                ]
            },
            {
                nombre: "Optativas",
                asignaturas: [
                    "Fundamentos de Sistemas Paralelos",
                    "Visualización Avanzada",
                    "Calidad de los Sistemas de Información",
                    "Almacenes y Minería de Datos",
                    "Conocimiento y Razonamiento Automático",
                    "Sistemas Inteligentes",
                    "Diseño y Administración de Redes",
                    "Ingeniería de Servicios",
                    "Computación en la Nube",
                    "Computación Ubicua",
                    "Programación de Arquitecturas Emergentes",
                    "Gestión de Información no estructurada",
                    "Modelos y Técnicas de Optimización",
                    "Aprendizaje Automático"
                ]
            }
        ]
    }
];

// ---------------------
// Variables
// ---------------------
let progreso = JSON.parse(localStorage.getItem("progreso")) || {};

// ---------------------
// Renderizado
// ---------------------
function renderMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";

    malla.forEach((añoData, index) => {
        const añoDiv = document.createElement("div");
        añoDiv.classList.add("año");

        const tituloAño = document.createElement("h2");
        tituloAño.textContent = `Año ${añoData.año}`;
        añoDiv.appendChild(tituloAño);

        añoData.semestres.forEach(semestre => {
            const cuatriDiv = document.createElement("div");
            cuatriDiv.classList.add("cuatri");

            const tituloCuatri = document.createElement("h3");
            tituloCuatri.textContent = semestre.nombre;
            cuatriDiv.appendChild(tituloCuatri);

            semestre.asignaturas.forEach(asignatura => {
                const asigDiv = document.createElement("div");
                asigDiv.classList.add("asignatura");
                asigDiv.textContent = asignatura;

                // ID único para guardar en localStorage
                const id = `${añoData.año}-${asignatura}`;
                
                // Estado de la asignatura
                if (progreso[id]) {
                    asigDiv.classList.add("completada");
                }

                // Bloqueo de años posteriores
                if (!puedeMarcar(añoData.año)) {
                    asigDiv.classList.add("bloqueada");
                }

                // Evento de clic
                asigDiv.addEventListener("click", () => {
                    if (asigDiv.classList.contains("bloqueada")) return;

                    asigDiv.classList.toggle("completada");
                    progreso[id] = asigDiv.classList.contains("completada");
                    localStorage.setItem("progreso", JSON.stringify(progreso));
                    renderMalla(); // refrescar para aplicar bloqueos
                });

                cuatriDiv.appendChild(asigDiv);
            });

            añoDiv.appendChild(cuatriDiv);
        });

        contenedor.appendChild(añoDiv);
    });
}

// ---------------------
// Función para bloqueo
// ---------------------
function puedeMarcar(año) {
    if (año === 1) return true;
    const añoAnterior = malla.find(a => a.año === año - 1);
    return añoAnterior.semestres.every(sem =>
        sem.asignaturas.every(asig =>
            progreso[`${año - 1}-${asig}`]
        )
    );
}

// ---------------------
// Botón de reset
// ---------------------
document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.clear();
    progreso = {};
    renderMalla();
});

// ---------------------
// Inicializar
// ---------------------
renderMalla();
