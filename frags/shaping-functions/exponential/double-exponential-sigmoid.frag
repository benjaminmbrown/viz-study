#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
The same doubling-and-flipping scheme can be used to create sigmoids 
from pairs of exponential functions. These have the advantage that 
the control parameter a can be continously varied between 0 and 1, 
and are therefore very useful as adjustable-contrast functions. 
However, they are more expensive to compute than the polynomial sigmoid 
flavors. The Double-Exponential Sigmoid approximates the Raised
 Inverted Cosine to within 1% when the parameter a is approximately 0.426.

*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}
float doubleExponentialSigmoid (float x, float a){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = min(max_param_a, max(min_param_a, a));
  a = 1.0-a; // for sensible results
  
  float y = 0;
  if (x<=0.5){
    y = (pow(2.0*x, 1.0/a))/2.0;
  } else {
    y = 1.0 - (pow(2.0*(1.0-x), 1.0/a))/2.0;
  }
  return y;
}
void main() {
    vec2 st = gl_FragCoord.st/u_resolution;

   // float y = blinnWyvillCosineApproximation(st.x);

    vec3 color = vec3(y);

    //Plot line
    float pct = plot(st,y);
    color = (1.0 - pct) * color + pct * vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color, 1.0);
}