varying float vTravelled;
varying vec2 vUv;

void main() {
  if(length(gl_PointCoord - vec2(0.5)) > 0.5) discard;

  float alpha = 1.0 - vTravelled;

  gl_FragColor = vec4(1.0, 1.0, 1.0, 0.4 * alpha);
}