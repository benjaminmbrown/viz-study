// Author @patriciogv - 2015


#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

vec2 tileIt(inout vec2 _st, in float rows, in float cols){
    _st.x *= abs(cos(u_time)) - rows; //rows
    _st.y *= abs(sin(u_time)) - cols; //cols  
    _st = fract(_st);
    return _st;
}

vec2 tileZoom(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}


float plot (vec2 st, float pct){
    return smoothstep(pct -0.02, pct, st.y) - 
    smoothstep(pct, pct+0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 st2 = st;
    
    vec3 color  = vec3(0.224,0.533,0.032);
    vec3 color2 = color;
 
    tileIt(st, 14.0,12.0);
    tileIt(st2,2.0,3.0);

    // Use a matrix to rotate the space of single unit
    st = rotate2D(st,PI*cos(u_time)*0.5);
    st2 *= rotate2D(st2,PI*sin(-u_time)*0.5);
    
    // Draw a square
    color = vec3(box(st2,sin(vec2(0.7)),0.1));
    color *= vec3(box(st,vec2(0.7),0.1));

    
	gl_FragColor = vec4(color,1.0);
}
