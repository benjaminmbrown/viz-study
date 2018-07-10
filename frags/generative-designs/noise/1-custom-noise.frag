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

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(u_mouse.x,u_mouse.y)))*
        41358.5453123);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    float i = floor(st);
    float f = fract(st);

    //cubic curve
    float u = f * f * (3.0 - 2.0 * f );
    float y = mix(random(i), random(i + 1.0), u); // using it in the interpolation


    float radius = abs(sin(u_time + 0.1));
	vec3 color = vec3(circle(st,radius));

    // a. The DISTANCE from the pixel to the center
   // pct = distance(st,vec2(0.5));

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);
   
    //COMBINE DISTANCES FIELDS
    // pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    // pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    //pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    //pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    //pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));

    //vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}