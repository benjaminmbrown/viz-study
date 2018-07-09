#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
A seat-shaped function can be created with a coupling of two 
exponential functions. This has nicer derivatives than the 
cubic function, and more continuous control in some respects, 
at the expense of greater CPU cycles. The recommended range for 
the control parameter a is from 0 to 1. Note that these equations 
are very similar to the Double-Exponential Sigmoid described below.


*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

float doubleExponentialSeat (float x, float a){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = min(max_param_a, max(min_param_a, a)); 

  float y = 0;
  if (x<=0.5){
    y = (pow(2.0*x, 1-a))/2.0;
  } else {
    y = 1.0 - (pow(2.0*(1.0-x), 1-a))/2.0;
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