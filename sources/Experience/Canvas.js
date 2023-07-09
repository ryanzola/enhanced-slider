import * as THREE from "three";
import Experience from "./Experience.js";

import vertex from "./Shader/canvas/vertexParticles.glsl";
import fragment from "./Shader/canvas/fragment.glsl";

export default class Canvas {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.config = this.experience.config;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geo = new THREE.BufferGeometry();

    let number = 3000
    let positions = new Float32Array(number * 3);
    let sizes = new Float32Array(number);
    let velocity = new Float32Array(number);
    let distance = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = Math.random() - 0.5 + 0.5 * (Math.random() - 0.5);
      positions[i * 3 + 1] *= 0.66;
      positions[i * 3 + 2] = 0;

      sizes[i] = this.randomInRange(1, 20);
      velocity[i] = this.randomInRange(0.1, 1);
      distance[i] = this.randomInRange(0.1, 1);
    }

    this.geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    this.geo.setAttribute("aVelocity", new THREE.BufferAttribute(velocity, 1));
    this.geo.setAttribute("aDistance", new THREE.BufferAttribute(distance, 1));
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        time: { value: 0 },
      }
    });
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geo, this.material);
    this.scene.add(this.mesh);
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  update() {
    this.material.uniforms.time.value = this.experience.time.elapsed * 0.001;
  }
}
