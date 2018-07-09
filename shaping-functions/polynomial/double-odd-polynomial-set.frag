#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
The previous Double-Cubic Seat function can be generalized to a form 
which uses any odd integer exponent. In the code below, the parameter 
n controls the flatness or breadth of the plateau region in the vicinity
 of the point
A good working range for n is the set of whole numbers from 1 to about 20.
*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

float doubleOddPolynomialSeat (float x, float a, float b, int n){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 

  int p = 2*n + 1;
  float y = 0;
  if (x <= a){
    y = b - b*pow(1-x/a, p);
  } else {
    y = b + (1-b)*pow((x-a)/(1-a), p);
  }
  return y;
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;

    //float y = blinnWyvillCosineApproximation(st.x);

    vec3 color = vec3(y);

    //Plot line
    float pct = plot(st,y);
    color = (1.0 - pct) * color + pct * vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color, 1.0);
}