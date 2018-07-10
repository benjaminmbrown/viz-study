#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in float x) {
    return fract(sin(x)*1e4);
}
// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
// float noise (in vec2 st) {
//     vec2 i = floor(st);//integer pos (index)
//     vec2 f = fract(st);//fractional positoin inside each cell

//     // Four corners in 2D of a tile
//     //Use integer pos to calculate the four corner coords
//     // and get random value for each one)

//     float a = random(i);
//     float b = random(i + vec2(1.0, 0.0));
//     float c = random(i + vec2(0.0, 1.0));
//     float d = random(i + vec2(1.0, 1.0));

//     // Smooth Interpolation 
//     //using the fractional positions from f
//     // Cubic Hermine Curve.  Same as SmoothStep()
//     vec2 u = f*f*(3.0-2.0*f);
//     // u = smoothstep(0.,1.,f);

//     // Mix 4 coorners percentages
    
//     return mix(a, b, u.x) +
//             (c - a)* u.y * (1.0 - u.x) +
//             (d - b) * u.x * u.y;
// }

float noise (in float x) {
    float i = floor(x);
    float f = fract(x);

    // Cubic Hermine Curve
    float u = f * f * (3.0 - 2.0 * f);

    return mix(random(i), random(i + 1.0), u);
}


float plot(vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main(){
 vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    float y = 0.0;
    // y = random(st.x*0.001+u_time);
    y = noise(st.x*3.+u_time);

    // color = vec3(y);
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}

