#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
A circular arc offers a quick and easy-to-code method for easing in
 or out of the unit square. The computational efficiency 
of the function is diminished by its use of a square root, however.
*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

//------------------------------
float circularEaseIn (float x){
  float y = 1 - sqrt(1 - x*x);
  return y;
}

//------------------------------
float circularEaseOut (float x){
  float y = sqrt(1 - sq(1 - x));
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