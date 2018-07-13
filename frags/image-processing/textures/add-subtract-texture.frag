// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2 u_tex0Resolution;

int col = 5;
int row = 4;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 st2 = st;
    

    // Resolution of one frame
    vec2 fRes = u_tex0Resolution/vec2(float(col),float(row));

    // Normalize value of the frame resolution
    vec2 nRes = u_tex0Resolution/fRes;

    // Scale the coordenates to a single frame
    st = st/nRes;

    // Calculate the offset in cols and rows
    float timeX = u_time*15.;
    float timeY = floor(timeX/float(col));
    vec2 offset = vec2( floor(timeX)/nRes.x,
                        1.0-(floor(timeY)/nRes.y) );

    float noiseOffset = 0.5;
    float angle = noise( st + u_time * 0.1 )*PI;
    float radius = noiseOffset;

    st += radius * vec2(cos(angle), sin(angle));

    st = fract(st+offset);

    vec3 color = vec3(0.);
    vec3 color1 = texture2D(u_tex0,st).rgb;
    vec3 color2 = texture2D(u_tex1,st).rgb;

   // color = color1+color2;      // Add
     //color = color1-color2;      // Diff
    //color = abs(color1-color2); // Abs Diff
     //color = color1*color2;      // Mult
     color = color1/color2;      // Div
   //color = max(color1,color2); // Ligther
  //color = min(color1,color2); // Darker
    //color = 1.0 - color;
    gl_FragColor = vec4(color, 1.0);
}
