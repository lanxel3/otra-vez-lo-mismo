// Datos de asignaturas (por año y semestre con créditos)
const malla = [
    {
        año: 1,
        asignaturas: [
            { nombre: "Fundamentos de Matemáticas", creditos: 6 },
            { nombre: "Álgebra", creditos: 6 },
            { nombre: "Matemática Discreta", creditos: 6 },
            { nombre: "Sistemas Digitales", creditos: 6 },
            { nombre: "Programación I", creditos: 6 },
            { nombre: "Fundamentos Tecnológicos y Físicos de la Informática", creditos: 6 },
            { nombre: "Estadística", creditos: 6 },
            { nombre: "Fundamentos de Computadores", creditos: 6 },
            { nombre: "Programación II", creditos: 6 },
            { nombre: "Cálculo y Análisis Numérico", creditos: 6 }
        ]
    },
    {
        año: 2,
        asignaturas: [
            { nombre: "Gestión Financiera de Empresas", creditos: 6 },
            { nombre: "Bases de Datos I", creditos: 6 },
            { nombre: "Algoritmos y Estructuras de Datos", creditos: 6 },
            { nombre: "Sistemas Operativos I", creditos: 6 },
            { nombre: "Redes", creditos: 6 },
            { nombre: "Programación Orientada a Objetos", creditos: 6 },
            { nombre: "Bases de Datos II", creditos: 4.5 },
            { nombre: "Sistemas Operativos II", creditos: 4.5 },
            { nombre: "Arquitectura de Computadores", creditos: 4.5 },
            { nombre: "Computación Gráfica", creditos: 4.5 },
            { nombre: "Diseño de Software", creditos: 6 }
        ]
    },
    {
        año: 3,
        asignaturas: [
            { nombre: "Teoría de Autómatas y Lenguajes Formales", creditos: 6 },
            { nombre: "Administración de Sistemas y Redes", creditos: 6 },
            { nombre: "Desarrollo de Aplicaciones Web", creditos: 6 },
            { nombre: "Gestión de Proyectos Informáticos", creditos: 4.5 },
            { nombre: "Ingeniería del Software", creditos: 12 },
            { nombre: "Computación Distribuida", creditos: 6 },
            { nombre: "Compiladores e Intérpretes", creditos: 4.5 },
            { nombre: "Inteligencia Artificial", creditos: 6 },
            { nombre: "Seguridad de la Información", creditos: 4.5 },
            { nombre: "Ciberseguridad", creditos: 4.5 }
        ]
    },
    {
        año: 4,
        asignaturas: [
            { nombre: "Interacción Persona-Ordenador", creditos: 6 },
            { nombre: "Ingeniería de Computadores", creditos: 6 },
            { nombre: "Trabajo Fin de Grado", creditos: 12 },
            { nombre: "Prácticas Externas", creditos: 9 },
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
];

// Generar HTML de malla
const contenedor = document.getElementById("contenedor-malla");

malla.forEach(curso => {
    const divCurso = document.createElement("div");
    divCurso.classList.add("curso");
    divCurso.id = `año-${curso.año}`;

    const titulo = document.createElement("h2");
    titulo.textContent = `Año ${curso.año}`;
    divCurso.appendChild(titulo);

    curso.asignaturas.forEach(asig => {
        const divAsig = document.createElement("div");
        divAsig.classList.add("asignatura");

        const check = document.createElement("input");
        check.type = "checkbox";
        check.classList.add("check-asignatura");
        check.dataset.creditos = asig.creditos;

        const nombre = document.createElement("span");
        nombre.textContent = asig.nombre;

        const nota = document.createElement("input");
        nota.type = "number";
        nota.classList.add("nota-asignatura");
        nota.min = 0;
        nota.max = 10;
        nota.step = 0.1;
        nota.placeholder = "Nota";

        divAsig.appendChild(check);
        divAsig.appendChild(nombre);
        divAsig.appendChild(nota);

        divCurso.appendChild(divAsig);
    });

    const media = document.createElement("div");
    media.classList.add("media-curso");
    media.id = `media-año-${curso.año}`;
    media.textContent = "Media: -";
    divCurso.appendChild(media);

    contenedor.appendChild(divCurso);
});

// Cargar datos guardados
function cargarDatos() {
    const completadas = JSON.parse(localStorage.getItem("asignaturasCompletadas")) || [];
    const notas = JSON.parse(localStorage.getItem("asignaturasNotas")) || {};

    document.querySelectorAll(".check-asignatura").forEach(chk => {
        if (completadas.includes(chk.nextElementSibling.textContent.trim())) {
            chk.checked = true;
        }
    });

    document.querySelectorAll(".nota-asignatura").forEach(input => {
        const nombre = input.previousElementSibling.textContent.trim();
        if (notas[nombre]) {
            input.value = notas[nombre];
        }
    });

    actualizarProgreso();
    actualizarMedias();
}
cargarDatos();

// Eventos
document.addEventListener("change", e => {
    if (e.target.classList.contains("check-asignatura")) {
        guardarCompletadas();
        actualizarProgreso();
    }
});

document.addEventListener("input", e => {
    if (e.target.classList.contains("nota-asignatura")) {
        guardarNotas();
        actualizarMedias();
    }
});

// Guardar completadas
function guardarCompletadas() {
    const completadas = [];
    document.querySelectorAll(".check-asignatura:checked").forEach(chk => {
        completadas.push(chk.nextElementSibling.textContent.trim());
    });
    localStorage.setItem("asignaturasCompletadas", JSON.stringify(completadas));
}

// Guardar notas
function guardarNotas() {
    const notas = {};
    document.querySelectorAll(".nota-asignatura").forEach(input => {
        const nombre = input.previousElementSibling.textContent.trim();
        if (input.value) {
            notas[nombre] = input.value;
        }
    });
    localStorage.setItem("asignaturasNotas", JSON.stringify(notas));
}

// Actualizar progreso
function actualizarProgreso() {
    const total = 240;
    let completados = 0;

    document.querySelectorAll(".check-asignatura:checked").forEach(chk => {
        completados += parseFloat(chk.dataset.creditos);
    });

    const porcentaje = Math.min((completados / total) * 100, 100);

    document.getElementById("progreso-texto").textContent =
        `Progreso: ${completados} / ${total} créditos`;

    const barra = document.getElementById("barra");
    barra.style.width = `${porcentaje}%`;
    barra.classList.remove("verde", "amarillo");

    if (porcentaje >= 100) {
        barra.classList.add("verde");
    } else if (porcentaje >= 50) {
        barra.classList.add("amarillo");
    }
}

// Actualizar medias
function actualizarMedias() {
    for (let año = 1; año <= 4; año++) {
        const asignaturas = document.querySelectorAll(`#año-${año} .nota-asignatura`);
        let suma = 0, contador = 0;

        asignaturas.forEach(input => {
            const nota = parseFloat(input.value);
            if (!isNaN(nota)) {
                suma += nota;
                contador++;
            }
        });

        const media = contador > 0 ? (suma / contador).toFixed(2) : "-";
        document.getElementById(`media-año-${año}`).textContent = `Media: ${media}`;
    }
}

// Botón reset
document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("asignaturasCompletadas");
    localStorage.removeItem("asignaturasNotas");
    document.querySelectorAll(".check-asignatura").forEach(chk => chk.checked = false);
    document.querySelectorAll(".nota-asignatura").forEach(input => input.value = "");
    actualizarProgreso();
    actualizarMedias();
});
