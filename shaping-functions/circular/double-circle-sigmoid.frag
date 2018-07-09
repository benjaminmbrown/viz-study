#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

/*
This sigmoidal shaping function is formed by the meeting of two circular 
arcs, which join with a vertical tangent. The parameter a, in the 
range [0...1], governs the location of the 
curve's inflection point along the diagonal of the unit square.
*/

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

float doubleCircleSigmoid (float x, float a){
  float min_param_a = 0.0;
  float max_param_a = 1.0;
  a = max(min_param_a, min(max_param_a, a)); 

  float y = 0;
  if (x<=a){
    y = a - sqrt(a*a - x*x);
  } else {
    y = a + sqrt(sq(1-a) - sq(x-1));
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