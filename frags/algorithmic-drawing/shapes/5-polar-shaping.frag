// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    //float r = length(pos)*2.0;
    float r = length(pos)*abs(sin(u_time)*3.0);
    //float a = atan(pos.y,pos.x);
    float a = atan(pos.y,pos.x)*u_time;

    float f = cos(a*3.);
    //  f = abs(cos(a*3.));
    //  f = abs(cos(a*2.5))*.5+.3;
    //  f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
     f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

     f = plot(st,f);

    color = vec3( 1.-smoothstep(f,f+0.02,r) );

    gl_FragColor = vec4(color, 1.0);
}
