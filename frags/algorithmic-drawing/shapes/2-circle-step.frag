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
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
   // pct = distance(st,vec2(0.5));

    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    vec2 tC = vec2(0.5)-st;
   // pct = sqrt(tC.x*tC.x+tC.y*tC.y);
   
    // float y = smoothstep(0.2,0.5,st.x) - smoothstep(0.5,0.8,st.x);
    //pct = plot(st,y);
   
    //COMBINE DISTANCES FIELDS
    // pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    // pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    //pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    //pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}