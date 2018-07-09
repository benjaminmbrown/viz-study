#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//USEFUL SHAPING FUNCTIONS
//y = mod(x,0.5); // return x modulo of 0.5
//y = fract(x); // return only the fraction part of a number
//y = ceil(x);  // nearest integer that is greater than or equal to x
//y = floor(x); // nearest integer less than or equal to x
//y = sign(x);  // extract the sign of x
//y = abs(x);   // return the absolute value of x
//y = clamp(x,0.0,1.0); // constrain x to lie between 0.0 and 1.0
//y = min(0.0,x);   // return the lesser of x and 0.0
//y = max(0.0,x);   // return the greater of x and 0.0 

//ADVANCED SHAPING FUNCTIONS

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;

    //float y = pow(st.x,3.0);
    //float y = step(0.5,st.x);
      //float y = smoothstep(0.1,0.9,st.x);
     float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
     // float y = smoothstep(u_mouse.x, 0.6,st.x);

    vec3 color = vec3(y);

    //Plot line
    float pct = plot(st,y);
    color = (1.0 - pct) * color + pct * vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color, 1.0);
}