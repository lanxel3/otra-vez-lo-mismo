const malla = [
    {
        año: 1,
        semestres: [
            {
                nombre: "Primer semestre",
                asignaturas: [
                    { nombre: "Fundamentos de Matemáticas", creditos: 6 },
                    { nombre: "Álgebra", creditos: 6 },
                    { nombre: "Matemática Discreta", creditos: 6 },
                    { nombre: "Sistemas Digitales", creditos: 6 },
                    { nombre: "Programación I", creditos: 6 }
                ]
            },
            {
                nombre: "Segundo semestre",
                asignaturas: [
                    { nombre: "Fundamentos Tecnológicos y Físicos de la Informática", creditos: 6 },
                    { nombre: "Estadística", creditos: 6 },
                    { nombre: "Fundamentos de Computadores", creditos: 6 },
                    { nombre: "Programación II", creditos: 6 },
                    { nombre: "Cálculo y Análisis Numérico", creditos: 6 }
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
                    { nombre: "Bases de Datos I", creditos: 6 },
                    { nombre: "Algoritmos y Estructuras de Datos", creditos: 6 },
                    { nombre: "Sistemas Operativos I", creditos: 6 },
                    { nombre: "Redes", creditos: 6 },
                    { nombre: "Programación Orientada a Objetos", creditos: 6 }
                ]
            },
            {
                nombre: "Segundo semestre",
                asignaturas: [
                    { nombre: "Gestión Financiera de Empresas", creditos: 6 },
                    { nombre: "Bases de Datos II", creditos: 4.5 },
                    { nombre: "Sistemas Operativos II", creditos: 4.5 },
                    { nombre: "Arquitectura de Computadores", creditos: 4.5 },
                    { nombre: "Computación Gráfica", creditos: 4.5 },
                    { nombre: "Diseño de Software", creditos: 6 }
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
                    { nombre: "Teoría de Autómatas y Lenguajes Formales", creditos: 6 },
                    { nombre: "Administración de Sistemas y Redes", creditos: 6 },
                    { nombre: "Computación Distribuida", creditos: 6 },
                    { nombre: "Inteligencia Artificial", creditos: 6 }
                ]
            },
            {
                nombre: "Segundo semestre",
                asignaturas: [
                    { nombre: "Desarrollo de Aplicaciones Web", creditos: 6 },
                    { nombre: "Gestión de Proyectos Informáticos", creditos: 4.5 },
                    { nombre: "Compiladores e Intérpretes", creditos: 4.5 },
                    { nombre: "Seguridad de la Información", creditos: 4.5 },
                    { nombre: "Ciberseguridad", creditos: 4.5 }
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
                    { nombre: "Interacción Persona-Ordenador", creditos: 6 },
                    { nombre: "Ingeniería de Computadores", creditos: 6 },
                    { nombre: "Trabajo Fin de Grado", creditos: 12 },
                    { nombre: "Prácticas Externas", creditos: 9 }
                ]
            },
            {
                nombre: "Optativas",
                asignaturas: [
                    { nombre: "Fundamentos de Sistemas Paralelos", creditos: 4.5 },
                    { nombre: "Visualización Avanzada", creditos: 4.5 },
                    { nombre: "Calidad de los Sistemas de Información", creditos: 4.5 },
                    { nombre: "Almacenes y Minería de Datos", creditos: 4.5 },
                    { nombre: "Conocimiento y Razonamiento Automático", creditos: 4.5 },
                    { nombre: "Sistemas Inteligentes", creditos: 4.5 },
                    { nombre: "Diseño y Administración de Redes", creditos: 4.5 },
                    { nombre: "Ingeniería de Servicios", creditos: 4.5 },
                    { nombre: "Computación en la Nube", creditos: 4.5 },
                    { nombre: "Computación Ubicua", creditos: 4.5 },
                    { nombre: "Programación de Arquitecturas Emergentes", creditos: 4.5 },
                    { nombre: "Gestión de Información no estructurada", creditos: 4.5 },
                    { nombre: "Modelos y Técnicas de Optimización", creditos: 4.5 },
                    { nombre: "Aprendizaje Automático", creditos: 4.5 }
                ]
            }
        ]
    }
];

let progreso = JSON.parse(localStorage.getItem("progreso")) || {};

function renderMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";

    malla.forEach(añoData => {
        const añoDiv = document.createElement("div");
        añoDiv.classList.add("año");

        const tituloAño = document.createElement("h2");
        tituloAño.textContent = `Año ${añoData.año}`;
        añoDiv.appendChild(tituloAño);

        const semestresDiv = document.createElement("div");
        semestresDiv.classList.add("semestres");

        añoData.semestres.forEach(semestre => {
            const cuatriDiv = document.createElement("div");
            cuatriDiv.classList.add("cuatri");

            const tituloCuatri = document.createElement("h3");
            tituloCuatri.textContent = semestre.nombre;
            cuatriDiv.appendChild(tituloCuatri);

            semestre.asignaturas.forEach(asignatura => {
                const asigDiv = document.createElement("div");
                asigDiv.classList.add("asignatura");
                asigDiv.textContent = `${asignatura.nombre} (${asignatura.creditos} créditos)`;

                const id = `${añoData.año}-${asignatura.nombre}`;

                if (progreso[id]) {
                    asigDiv.classList.add("completada");
                }

                if (!puedeMarcar(añoData.año)) {
                    asigDiv.classList.add("bloqueada");
                }

                asigDiv.addEventListener("click", () => {
                    if (asigDiv.classList.contains("bloqueada")) return;

                    asigDiv.classList.toggle("completada");
                    progreso[id] = asigDiv.classList.contains("completada");
                    localStorage.setItem("progreso", JSON.stringify(progreso));
                    actualizarProgreso();
                    renderMalla();
                });

                cuatriDiv.appendChild(asigDiv);
            });

            semestresDiv.appendChild(cuatriDiv);
        });

        añoDiv.appendChild(semestresDiv);
        contenedor.appendChild(añoDiv);
    });
}

function puedeMarcar(año) {
    if (año === 1) return true;
    const añoAnterior = malla.find(a => a.año === año - 1);
    return añoAnterior.semestres.every(sem =>
        sem.asignaturas.every(asig =>
            progreso[`${año - 1}-${asig.nombre}`]
        )
    );
}

function calcularTotalCreditos() {
    return malla.reduce((total, año) =>
        total + año.semestres.reduce((sum, sem) =>
            sum + sem.asignaturas.reduce((s, asig) => s + asig.creditos, 0), 0
        ), 0
    );
}

function calcularCreditosCompletados() {
    return malla.reduce((total, año) =>
        total + año.semestres.reduce((sum, sem) =>
            sum + sem.asignaturas.reduce((s, asig) =>
                s + (progreso[`${año.año}-${asig.nombre}`] ? asig.creditos : 0), 0
            ), 0
        ), 0
    );
}

function actualizarProgreso() {
    const total = 240; // Total fijo de créditos
    const completados = calcularCreditosCompletados();
    const porcentaje = (completados / total) * 100;

    document.getElementById("progreso-texto").textContent =
        `Progreso: ${completados} / ${total} créditos`;

    const barra = document.getElementById("barra");
    barra.style.width = `${porcentaje}%`;

    // Quitamos clases de color previas
    barra.classList.remove("verde", "amarillo");

    // Cambiamos color según porcentaje
    if (porcentaje >= 100) {
        barra.classList.add("verde");
    } else if (porcentaje >= 50) {
        barra.classList.add("amarillo");
    }
}



document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.clear();
    progreso = {};
    actualizarProgreso();
    renderMalla();
});

renderMalla();
actualizarProgreso();
