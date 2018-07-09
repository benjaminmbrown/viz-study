#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
This modified version of the Double-Cubic Seat function uses 
a single variable to control the location of its inflection 
point along the diagonal of the unit square. A second parameter 
is used to blend this curve with the Identity Function (y=x). 
Here, we use the variable b to control the amount of this blend, 
which has the effect of tilting the slope of the curve's plateau 
in the vicinity of its inflection point. The adjustable flattening 
around the inflection point makes this a useful shaping
 function for lensing or magnifying evenly-spaced data.
*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

float doubleCubicSeatWithLinearBlend (float x, float a, float b){

  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  float min_param_b = 0.0;
  float max_param_b = 1.0;
  a = min(max_param_a, max(min_param_a, a));  
  b = min(max_param_b, max(min_param_b, b)); 
  b = 1.0 - b; //reverse for intelligibility.
  
  float y = 0;
  if (x<=a){
    y = b*x + (1-b)*a*(1-pow(1-x/a, 3.0));
  } else {
    y = b*x + (1-b)*(a + (1-a)*pow((x-a)/(1-a), 3.0));
  }
  return y;
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;

    float y = blinnWyvillCosineApproximation(st.x);

    vec3 color = vec3(y);

    //Plot line
    float pct = plot(st,y);
    color = (1.0 - pct) * color + pct * vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color, 1.0);
}