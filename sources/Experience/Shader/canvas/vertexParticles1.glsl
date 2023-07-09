
attribute float aDistance;
attribute float aRandom;
attribute float aSize;
attribute float aVelocity;

uniform float time;
uniform sampler2D texture1;

varying vec3 vPosition;
varying float vTravelled;
varying vec2 vUv;

float pi = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;

  vec3 pos = position;
  pos.x = mod( 0.08 * aVelocity * time - aRandom, 1.0 );

  vTravelled = pos.x;

  pos.x = 5.0 * (pos.x - 0.5);

  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

  gl_PointSize = 0.8 * aSize * ( 1.0 / - mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}
