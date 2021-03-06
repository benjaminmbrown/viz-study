// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 zoom(vec2 _st, float _zoom){
    return _st *=_zoom;
}
vec2 brickTile(vec2 _st){
    // Here is where the offset is happening
    _st.x += step(1., mod(_st.y,2.0)) * 0.5;
    return fract(_st);
}

vec2 animatedBrickTile(vec2 _st){
    _st.x += step(cos(u_time)*2.0,mod(_st.y,2.0)) * sin(u_time)/2.0;
     _st.y += step(cos(u_time)*2.0,mod(_st.y,2.0)) * sin(u_time)/2.0;
  //  _st.y += step(1.,mod(_st.y,2.0)) * cos(u_time)/2.0;
    return fract(_st);
}

float box(vec2 _st, vec2 _size){
    _size = vec2(0.5)-_size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(1e-4),_st);
    uv *= smoothstep(_size,_size+vec2(1e-4),vec2(1.0)-_st);
    return uv.x*uv.y;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Modern metric brick of 215mm x 102.5mm x 65mm
    // http://www.jaharrison.me.uk/Brickwork/Sizes.html
    st /= vec2(2.15,0.65)/1.5;

    // Apply the brick tiling
    st = zoom(st, 22.0);
    //st = brickTile(st);
    st = animatedBrickTile(st);

    color = vec3(box(st,vec2(0.9)));

    // Uncomment to see the space coordinates
  color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}