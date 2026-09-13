import React, { useEffect, useRef } from 'react';

const vertex = `attribute vec2 position;
void main() { gl_Position = vec4(position, 0., 1.); }`;

const fragment = `precision mediump float;
uniform vec2 resolution;
uniform vec4 clipBounds;
uniform vec2 pointer;
uniform float time;
uniform float influence;
uniform float lightMode;
uniform vec3 ripples[4];
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)),f.x), mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);
}
float field(vec2 p) {
  float n = 0.;
  float amplitude = .5;
  for(int i=0;i<4;i++) { n += amplitude*noise(p); p = mat2(.8,-.6,.6,.8)*p*2.03+4.7; amplitude *= .5; }
  return n;
}
float bayer2(vec2 p) { p=floor(p); return fract(p.x*.5+p.y*p.y*.75); }
float bayer8(vec2 p) { return bayer2(p)+bayer2(p*.5)*.25+bayer2(p*.25)*.0625; }
void main() {
  vec2 pixel = floor(gl_FragCoord.xy/2.);
  vec2 uv = (pixel*2.-resolution*.5)/resolution.y;
  vec2 m = (pointer-resolution*.5)/resolution.y;
  float t = time*.075;
  vec2 delta = uv-m;
  float aura = exp(-dot(delta,delta)*8.)*influence;
  vec2 warp = vec2(field(uv*1.65+vec2(t,-t*.6)),field(uv*1.65+vec2(-t*.45,t)+8.));
  vec2 flow = uv*2.5+warp*1.7 + vec2(-delta.y,delta.x)*aura*.65;
  float n = field(flow+vec2(t*.35,-t*.25));
  float mist = smoothstep(.27,.78,n)*.48;
  mist += aura*.13;
  for(int i=0;i<4;i++) {
    float age = time-ripples[i].z;
    vec2 origin = (ripples[i].xy-resolution*.5)/resolution.y;
    float radius = length(uv-origin);
    float ring = exp(-pow((radius-age*.18)/.035,2.));
    mist += ring*exp(-age*.85)*.3*step(0.,age);
  }
  float edge = smoothstep(.05,.8,abs(uv.x)+.22);
  float density = clamp(mist*(.55+edge*.45),0.,.7);
  // On paper, fewer darker marks keep the field airy and its contours distinct.
  float inkDensity = smoothstep(.025,.31,density)*.38;
  density = mix(density,inkDensity,lightMode);
  // Fade the field before the containing section clips it, including its overscan.
  vec2 screen = gl_FragCoord.xy / resolution;
  vec2 feather = min(vec2(.14), vec2(140.) / resolution);
  vec2 enter = smoothstep(clipBounds.xy, clipBounds.xy + feather, screen);
  vec2 leave = 1. - smoothstep(clipBounds.zw - feather, clipBounds.zw, screen);
  density *= enter.x * enter.y * leave.x * leave.y;
  float dotOn = step(bayer8(pixel)+.008,density);
  gl_FragColor = vec4(vec3(1.), dotOn);
}`;

export default function DitherField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas.parentElement;
    // Keep the site fully usable when GPU rendering is unavailable.
    if (!window.matchMedia) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders = [];
    let program;
    let buffer;
    let frame = 0;
    let stopped = false;
    let visible = true;
    const cleanupGPU = () => {
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach(shader => gl.deleteShader(shader));
    };
    try {
      program = gl.createProgram();
      for (const [type, source] of [[gl.VERTEX_SHADER, vertex], [gl.FRAGMENT_SHADER, fragment]]) {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Shader unavailable');
        gl.attachShader(program, shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Shader unavailable');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    } catch {
      cleanupGPU();
      return;
    }
    const uniforms = Object.fromEntries(['resolution','clipBounds','pointer','time','influence','lightMode','ripples[0]'].map(name => [name, gl.getUniformLocation(program, name)]));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let time = 0, last = 0, strength = 0, targetStrength = 0, nextRipple = 0;
    const target = [.7, .5], pointer = [.7, .5];
    const rings = Array.from({ length: 4 }, () => [-10, -10, -100]);
    const draw = () => {
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, pointer[0]*canvas.width, pointer[1]*canvas.height);
      gl.uniform1f(uniforms.time, time);
      gl.uniform1f(uniforms.lightMode, document.documentElement.classList.contains('dark') ? 0 : 1);
      gl.uniform1f(uniforms.influence, strength);
      gl.uniform3fv(uniforms['ripples[0]'], new Float32Array(rings.flatMap(([x,y,t]) => [x*canvas.width,y*canvas.height,t])));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const animate = now => {
      frame = 0;
      if (stopped || document.hidden || !visible || reduced.matches) return;
      const delta = last ? Math.min((now-last)/1000,.05) : 0;
      last = now;
      time += delta;
      const easing = 1-Math.exp(-delta*4);
      pointer[0] += (target[0]-pointer[0])*easing;
      pointer[1] += (target[1]-pointer[1])*easing;
      strength += (targetStrength-strength)*easing;
      draw();
      frame = requestAnimationFrame(animate);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (stopped) return;
      draw();
      if (!document.hidden && visible && !reduced.matches) frame = requestAnimationFrame(animate);
    };
    const resize = () => {
      // CSS-pixel resolution avoids excessive work on high-DPI screens.
      const canvasRect = canvas.getBoundingClientRect();
      const surfaceRect = surface.getBoundingClientRect();
      const { width, height } = canvasRect;
      canvas.width = Math.max(1, Math.min(width, 1920));
      canvas.height = Math.max(1, Math.round(height*canvas.width/Math.max(1,width)));
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.uniform4f(uniforms.clipBounds,
        Math.max(0, (surfaceRect.left - canvasRect.left) / Math.max(1, width)),
        Math.max(0, (canvasRect.bottom - surfaceRect.bottom) / Math.max(1, height)),
        Math.min(1, (surfaceRect.right - canvasRect.left) / Math.max(1, width)),
        Math.min(1, (canvasRect.bottom - surfaceRect.top) / Math.max(1, height)));

      sync();
    };
    const coordinates = event => {
      const rect = canvas.getBoundingClientRect();
      return [(event.clientX-rect.left)/rect.width,1-(event.clientY-rect.top)/rect.height];
    };
    const move = event => { [target[0],target[1]]=coordinates(event); targetStrength=1; };
    const leave = () => { targetStrength=0; };
    const click = event => {
      if (reduced.matches || event.target.closest('a,button,input,textarea,select')) return;
      rings[nextRipple] = [...coordinates(event),time];
      nextRipple = (nextRipple+1)%4;
    };
    const lost = event => { event.preventDefault(); stopped=true; cancelAnimationFrame(frame); canvas.style.opacity='0'; };
    window.addEventListener('resize',resize);
    surface.addEventListener('pointermove',move,{passive:true});
    surface.addEventListener('pointerleave',leave);
    surface.addEventListener('pointerdown',click,{passive:true});
    document.addEventListener('visibilitychange',sync);
    reduced.addEventListener('change',sync);
    canvas.addEventListener('webglcontextlost',lost);
    const sizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    sizeObserver?.observe(surface);
    const visibilityObserver = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; sync(); }) : null;
    visibilityObserver?.observe(surface);
    const themeObserver = new MutationObserver(sync);
    themeObserver.observe(document.documentElement, { attributes:true, attributeFilter:['class'] });
    resize();
    return () => {
      themeObserver.disconnect();
      sizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      stopped=true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize',resize);
      surface.removeEventListener('pointermove',move);
      surface.removeEventListener('pointerleave',leave);
      surface.removeEventListener('pointerdown',click);
      document.removeEventListener('visibilitychange',sync);
      reduced.removeEventListener('change',sync);
      canvas.removeEventListener('webglcontextlost',lost);
      cleanupGPU();
    };
  }, []);
  return <canvas ref={canvasRef} className="dither-field" aria-hidden="true" />;
}
