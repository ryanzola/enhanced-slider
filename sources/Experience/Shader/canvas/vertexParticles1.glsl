
attribute float aDistance;
attribute float aRandom;
attribute float aSize;
attribute float aVelocity;

uniform float time;
uniform sampler2D texture1;

varying vec3 vPosition;
varying float vTravelled;
varying vec2 vUv;
varying float vRandom;

float pi = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vRandom = aRandom;

  vec3 pos = position;
  pos.x = mod( 0.08 * aVelocity * time - aRandom, 1.0 );
  // pos.y = 0.5 * sin( 2.0 * pi * pos.x );   // cool wave effect mistake lol
  // pos.y = 0.5 * sin( time * aRandom );
  pos.y += 0.1 * sin( time * aRandom ) * aRandom;

  vTravelled = pos.x;

  pos.x = 5.0 * (pos.x - 0.5);

  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

  gl_PointSize = 0.8 * aSize * ( 1.0 / - mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}
