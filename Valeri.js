const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ==========================
   GALAXIA
========================== */

let galaxy = [];

const numStars = 5000;
const branches = 4;

for(let i=0;i<numStars;i++){

    let radius = Math.random()*800;

    let branch =
        (i % branches) *
        ((Math.PI*2)/branches);

    let spin = radius * 0.02;

    let randomX =
        (Math.random()-0.5)*60;

    let randomY =
        (Math.random()-0.5)*60;

    galaxy.push({

        x:
        Math.cos(branch + spin)
        * radius
        + randomX,

        y:
        Math.sin(branch + spin)
        * radius
        + randomY,

        radius:radius,

        size:
        Math.random()*2+0.5

    });

}

/* ==========================
   CORAZÓN
========================== */

function heartPoint(t){

    return{

        x:
        16*Math.pow(
            Math.sin(t),
            3
        ),

        y:
        13*Math.cos(t)
        -5*Math.cos(2*t)
        -2*Math.cos(3*t)
        -Math.cos(4*t)

    };

}

let heart = [];

for(let t=0;t<Math.PI*2;t+=0.02){

    let p = heartPoint(t);

    heart.push({

        x:p.x*18,

        y:-p.y*18

    });

}

/* ==========================
   ZOOM
========================== */

let zoom = 4;

/* ==========================
   TARJETAS
========================== */

const tarjetas = [

{
    foto:"",
    texto:
    "<h2>🌷 Para Valeria 🌷</h2>" +
    "<br>" +
    "Hay momentos difíciles que llegan sin avisar." +
    "<br><br>" +
    "Pero también existen personas que desean verte sonreír incluso cuando tú misma olvidas hacerlo." +
    "<br><br>" +
    "<b>Desliza para continuar →</b>"
},

{
    foto:"img/Foto1.jpeg",
    texto:
    "Hay algo en ti que sigue firme, incluso en momentos así, y eso habla mucho de ti."
},

{
    foto:"img/Foto2.jpeg",
    texto:
    "Tu forma de ser tiene algo que da calma, aunque no lo notes. Y a veces eso es justo lo que más falta hace en los días difíciles."
},

{
    foto:"img/Foto3.jpeg",
    texto:
    "Incluso en los días difíciles sigues siendo una persona increíble."
},

{
    foto:"img/Foto4.jpeg",
    texto:
    "Vendrán momentos que volverán a hacerte sonreír."
},

{
    foto:"",
    texto:
    "<h2>💖</h2>" +
    "<br>" +
    "Esto no es el final de tu historia, solo un momento difícil."+ 
    "<br>"+
    "Vas a salir de esto, incluso más fuerte de lo que imaginas, y poco a poco vas a volver a sentirte bien contigo misma."+
    "<br>" +
    "Cuídate mucho. ✨" +
    "<br><br>" +
    "<b>— EA </b>"
}

];

let actual = 0;

const indicador =
document.getElementById(
    "indicador"
);

for(
    let i=0;
    i<tarjetas.length;
    i++
){

    const punto =
    document.createElement(
        "div"
    );

    punto.classList.add(
        "punto"
    );

    indicador.appendChild(
        punto
    );

}

/* ==========================
   MOSTRAR TARJETA
========================== */

function mostrarTarjeta(){

    const card =
    document.getElementById(
        "card"
    );

    card.classList.add(
        "fade-out"
    );

    setTimeout(()=>{

        const imagen =
        document.getElementById(
            "cardImage"
        );

        const texto =
        document.getElementById(
            "cardText"
        );

        if(
            tarjetas[actual].foto
            === ""
        ){

            imagen.style.display =
            "none";

        }
        else{

            imagen.style.display =
            "block";

            imagen.src =
            tarjetas[actual].foto;

        }

        texto.innerHTML =
        tarjetas[actual].texto;

        const puntos =
        document.querySelectorAll(
            ".punto"
        );

        puntos.forEach(

            p=>p.classList.remove(
                "activo"
            )

        );

        puntos[actual]
        .classList.add(
            "activo"
        );

        card.classList.remove(
            "fade-out"
        );

        card.classList.add(
            "fade-in"
        );

    },250);

}

mostrarTarjeta();

/* ==========================
   ANIMACIÓN
========================== */

let rotation = 0;

function animate(){

    rotation += 0.0005;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.save();

    ctx.translate(
        canvas.width/2,
        canvas.height/2
    );

    ctx.scale(
        zoom,
        zoom
    );

    /* ==========
       GALAXIA
    ========== */

    galaxy.forEach(star=>{

        let glow =
        Math.max(
            120,
            255-star.radius/4
        );

        ctx.fillStyle =
        `rgb(
        255,
        ${glow},
        ${glow}
        )`;

        ctx.beginPath();

        let x =
        Math.cos(rotation)
        *star.x
        -
        Math.sin(rotation)
        *star.y;

        let y =
        Math.sin(rotation)
        *star.x
        +
        Math.cos(rotation)
        *star.y;

        ctx.arc(

            x,
            y,

            star.size,

            0,
            Math.PI*2

        );

        ctx.fill();

    });

    /* ==========
       CORAZÓN
    ========== */

    heart.forEach(p=>{

        ctx.shadowBlur = 20;

        ctx.shadowColor =
        "#ff66aa";

        ctx.fillStyle =
        "#ff66aa";

        ctx.beginPath();

        ctx.arc(

            p.x,
            p.y,

            3,

            0,
            Math.PI*2

        );

        ctx.fill();

    });

    ctx.shadowBlur = 0;

    ctx.restore();

    if(zoom>1){

        zoom-=0.01;

    }

    requestAnimationFrame(
        animate
    );

}

animate();

/* ==========================
   SWIPE CELULAR
========================== */

let startX = 0;

document.addEventListener(

    "touchstart",

    e=>{

        startX =
        e.touches[0].clientX;

    }

);

document.addEventListener(

    "touchend",

    e=>{

        let endX =
        e.changedTouches[0]
        .clientX;

        let diff =
        startX-endX;

        if(diff>50){

            if(
                actual
                <
                tarjetas.length-1
            ){

                actual++;

                mostrarTarjeta();

            }

        }

        if(diff<-50){

            if(actual>0){

                actual--;

                mostrarTarjeta();

            }

        }

    }

);

/* ==========================
   TECLADO PC
========================== */

document.addEventListener(

    "keydown",

    e=>{

        if(

            e.key==="ArrowRight"

            &&

            actual
            <
            tarjetas.length-1

        ){

            actual++;

            mostrarTarjeta();

        }

        if(

            e.key==="ArrowLeft"

            &&

            actual>0

        ){

            actual--;

            mostrarTarjeta();

        }

    }

);

/* ==========================
   RESPONSIVE
========================== */

window.addEventListener(

    "resize",

    ()=>{

        canvas.width =
        window.innerWidth;

        canvas.height =
        window.innerHeight;

    }

);