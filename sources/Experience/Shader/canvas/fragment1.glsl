varying float vTravelled;
varying vec2 vUv;
varying float vRandom;

void main() {
  if(length(gl_PointCoord - vec2(0.5)) > 0.5) discard;

  float alpha = 1.0 - vTravelled;

  vec3 finalColor = mix(vec3(1.0), vec3(0.345, 0.281, 0.543), mod(vRandom, 0.5));

  gl_FragColor = vec4(finalColor, 0.4);
}