#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
This would be a useful approximation for the cos() and sin() trigonometric functions for a small microprocessor (such as an Arduino) which has limited speed and math capabilities.
*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

float blinnWyvillCosineApproximation (float x){
  float x2 = x*x;
  float x4 = x2*x2;
  float x6 = x4*x2;
  
  final float fa = ( 4.0/9.0);
  final float fb = (17.0/9.0);
  final float fc = (22.0/9.0);
  
  float y = fa*x6 - fb*x4 + fc*x2;
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