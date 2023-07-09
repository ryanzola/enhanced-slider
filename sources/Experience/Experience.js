import * as THREE from "three";
import GUI from "lil-gui";

import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";
import Stats from "./Utils/Stats.js";

import Resources from "./Resources.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import World from "./World.js";

import assets from "./assets.js";

export default class Experience {
  static instance;

  constructor(_options = {}) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    // Options
    this.targetElement = _options.targetElement;

    if (!this.targetElement) {
      console.warn("Missing 'targetElement' property");
      return;
    }

    this.frame = 0;

    this.scroller = [...document.querySelectorAll(".slider__scroller")]
    this.position = -2*(360+200)

    this.encodedSlides = [...document.querySelectorAll(".encoded .slide")]


    this.time = new Time();
    this.sizes = new Sizes();
    this.setConfig();
    this.setDebug();
    this.setStats();
    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setResources();
    this.setWorld();
    this.populateEncodedSlides();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.update();
  }

  generateString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%^&!@";
    var charactersLength = characters.length;
    let counter = 0
    while (counter < length) {
      if(Math.random() > 0.95) {
        result += '<strong>' + characters.charAt( Math.floor(Math.random() * charactersLength)) + '</strong>';
      }
      else {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      } 
      result += " ";
      counter++
    }
    return result;
  }

  populateEncodedSlides() {
    this.encodedSlides.forEach((slide) => {
      slide.innerHTML = this.generateString(400);
    });
  }

  setConfig() {
    this.config = {};

    // Debug
    this.config.debug = window.location.hash === "#debug";

    // Pixel ratio
    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    // Width and height
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height || window.innerHeight;
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new GUI();
    }
  }

  setStats() {
    if (this.config.debug) {
      this.stats = new Stats(true);
    }
  }

  setScene() {
    this.scene = new THREE.Scene();
  }

  setCamera() {
    this.camera = new Camera();
  }

  setRenderer() {
    this.renderer = new Renderer({ rendererInstance: this.rendererInstance });

    this.targetElement.appendChild(this.renderer.instance.domElement);
  }

  setResources() {
    this.resources = new Resources(assets);
  }

  setWorld() {
    this.world = new World();
  }

  update() {
    if (this.stats) this.stats.update();

    this.frame += 1;
    if(this.frame % 50 === 0) {
      this.populateEncodedSlides();
    }

    this.position += 0.5;
    if(this.position > 0) this.position = -2*(360+200);
    this.scroller.forEach((scroller) => {
      scroller.style.transform = `translateX(${this.position}px)`;
    });

    this.camera.update();

    if (this.world) this.world.update();

    if (this.renderer) this.renderer.update();

    window.requestAnimationFrame(() => {
      this.update();
    });
  }

  resize() {
    // Config
    const boundings = this.targetElement.getBoundingClientRect();
    this.config.width = boundings.width;
    this.config.height = boundings.height;

    this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

    if (this.camera) this.camera.resize();

    if (this.renderer) this.renderer.resize();

    if (this.world) this.world.resize();
  }

  destroy() {}
}
