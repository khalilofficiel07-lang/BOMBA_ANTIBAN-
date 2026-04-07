// Typing Effect
const text = "WELCOME\nTO\nSPAM BOMBA";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += 
      text[i] === "\n" ? "<br>" : text[i];
    i++;
    setTimeout(type, 60);
  }
}
type();

// Start 3D
setTimeout(() => {
  document.getElementById("intro").style.display = "none";
  start3D();
}, 7000);

function start3D() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Earth
  const texture = new THREE.TextureLoader().load(
    "https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg"
  );

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(2, 64, 64),
    new THREE.MeshStandardMaterial({ map: texture })
  );

  scene.add(earth);

  // Light
  const light = new THREE.PointLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  // Bomb
  const bomb = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );

  bomb.position.y = 5;
  scene.add(bomb);

  camera.position.z = 6;

  let exploded = false;

  function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.01;

    if (!exploded) {
      bomb.position.y -= 0.05;

      if (bomb.position.y <= 0) {
        exploded = true;
        explode(scene);
      }
    }

    renderer.render(scene, camera);
  }

  animate();
}

// Explosion
function explode(scene) {

  document.getElementById("boomSound").play();

  const particles = [];

  for (let i = 0; i < 400; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xff5500 })
    );

    p.velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
      z: (Math.random() - 0.5) * 0.5
    };

    scene.add(p);
    particles.push(p);
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);

    particles.forEach(p => {
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;
      p.position.z += p.velocity.z;
    });
  }

  animateParticles();

  setTimeout(() => {
    document.getElementById("panel").classList.remove("hidden");
  }, 2000);
}

// Demo API
async function activate() {
  const id = document.getElementById("user1").value;

  const res = await fetch("/activate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ user_id: id })
  });

  const data = await res.json();
  document.getElementById("msg1").innerText = data.message;
}

async function stop() {
  const id = document.getElementById("user2").value;

  const res = await fetch("/stop", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ user_id: id })
  });

  const data = await res.json();
  document.getElementById("msg2").innerText = data.message;
}
