import * as THREE from "three";
import Experience from "./Experience.js";

import vertex from "./Shader/canvas/vertexParticles.glsl";
import fragment from "./Shader/canvas/fragment.glsl";
import vertex1 from "./Shader/canvas/vertexParticles1.glsl";
import fragment1 from "./Shader/canvas/fragment1.glsl";

export default class Canvas {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.config = this.experience.config;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    this.setGeometry1();
    this.setMaterial1();
    this.setMesh1();
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

  setGeometry1() {
    this.geo1 = new THREE.BufferGeometry();

    let number = 1000
    let positions = new Float32Array(number * 3);
    let sizes = new Float32Array(number);
    let velocity = new Float32Array(number);
    let distance = new Float32Array(number);
    let random = new Float32Array(number);

    for (let i = 0; i < number; i++) {
      positions[i * 3 + 0] = 0;
      positions[i * 3 + 1] = Math.random() - 0.5 + 0.5 * (Math.random() - 0.5);
      positions[i * 3 + 1] *= 0.66;
      positions[i * 3 + 2] = 0;

      sizes[i] = this.randomInRange(3, 14);
      velocity[i] = this.randomInRange(0.1, 1);
      distance[i] = this.randomInRange(0.1, 1);
      random[i] = Math.random();
    }

    this.geo1.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geo1.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    this.geo1.setAttribute("aVelocity", new THREE.BufferAttribute(velocity, 1));
    this.geo1.setAttribute("aDistance", new THREE.BufferAttribute(distance, 1));
    this.geo1.setAttribute("aRandom", new THREE.BufferAttribute(random, 1));
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

  setMaterial1() {
    this.material1 = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      vertexShader: vertex1,
      fragmentShader: fragment1,
      uniforms: {
        time: { value: 0 },
      }
    });
  }

  setMesh() {
    this.points = new THREE.Points(this.geo, this.material);
    this.scene.add(this.points);
  }

  setMesh1() {
    this.points1 = new THREE.Points(this.geo1, this.material1);
    this.scene2.add(this.points1);
  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  update() {
    this.material.uniforms.time.value = this.experience.time.elapsed * 0.001;
    this.material1.uniforms.time.value = this.experience.time.elapsed * 0.001;
  }
}
