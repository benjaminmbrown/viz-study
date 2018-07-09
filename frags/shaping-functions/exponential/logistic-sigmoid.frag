#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
The so-called "Logistic Curve" is an elegant sigmoidal function which 
is believed by many scientists to best represent the growth of organic 
populations and many other natural phenomena. In software engineering, 
it is often used for weighting signal-response functions in neural networks. 
In this implementation, the parameter a regulates the slope or "growth rate" 
of the sigmoid during its rising portion. When a=0, this version of the 
Logistic function collapses to the Identity Function (y=x). 
The Logistic Sigmoid has very natural rates of change, but is expensive 
to calculate due to the use of many exponential functions
*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

float logisticSigmoid (float x, float a){
  // n.b.: this Logistic Sigmoid has been normalized.

  float epsilon = 0.0001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = max(min_param_a, min(max_param_a, a));
  a = (1/(1-a) - 1);

  float A = 1.0 / (1.0 + exp(0 -((x-0.5)*a*2.0)));
  float B = 1.0 / (1.0 + exp(a));
  float C = 1.0 / (1.0 + exp(0-a)); 
  float y = (A-B)/(C-B);
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