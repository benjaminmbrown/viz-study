#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_mouse;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(0.0);

    //first - only handles bottom and left
    // float left = step(0.1,st.x);//like X > 0.1
    // float bottom = step(0.1, st.y);

    //smoothstep(pct, pct+0.02, st.y);
    vec2 bottom_left = step(vec2(0.2),st);
    float pct = bottom_left.x * bottom_left.y;

    vec2 top_right = step(vec2(0.1),1.0-st);
    pct *= top_right.x * top_right.y;// (bl.x * bl.y * tr.x * tr.y);
    
    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}
