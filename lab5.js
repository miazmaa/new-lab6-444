import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.module.js';

const scene = new THREE.Scene();

const camera =
    new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(
    renderer.domElement
);

//////////////////////////////////////////////////
// Cube
//////////////////////////////////////////////////

const geometry =
    new THREE.BoxGeometry();

const material =
    new THREE.MeshPhongMaterial({
        color: 0x888888
    });

const cube =
    new THREE.Mesh(
        geometry,
        material
    );

scene.add(cube);

//////////////////////////////////////////////////
// Ambient Light
//////////////////////////////////////////////////

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.2
    );

scene.add(
    ambientLight
);

//////////////////////////////////////////////////
// Directional Light
//////////////////////////////////////////////////

const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        1.0
    );

directionalLight.position.set(
    1,
    1,
    1
);

scene.add(
    directionalLight
);

camera.position.z = 3;

//////////////////////////////////////////////////
// Animation
//////////////////////////////////////////////////

function animate()
{
    requestAnimationFrame(
        animate
    );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    let t =
        Date.now() * 0.001;

    //////////////////////////////////////////
    // Moving Light
    //////////////////////////////////////////

    directionalLight.position.x =
        Math.cos(t);

    directionalLight.position.z =
        Math.sin(t);

    //////////////////////////////////////////
    // Animated Color
    //////////////////////////////////////////

    let r =
        Math.abs(
            Math.sin(t)
        );

    let g =
        Math.abs(
            Math.sin(t * 1.3)
        );

    let b =
        Math.abs(
            Math.sin(t * 1.7)
        );

    directionalLight.color.setRGB(
        r,
        g,
        b
    );

    renderer.render(
        scene,
        camera
    );
}

animate();

//////////////////////////////////////////////////
// Resize Support
//////////////////////////////////////////////////

window.addEventListener(
    "resize",
    () =>
    {
        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);