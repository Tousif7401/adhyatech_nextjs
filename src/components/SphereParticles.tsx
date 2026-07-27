'use client';

/**
 * Sphere Particle Formation
 *
 * This component was inspired and implemented based on the implementation at https://crazygl.com/hero/particle-slider
 * Original implementation by @ybouane https://x.com/ybouane
 */

import { useEffect, useRef } from 'react';

interface SphereParticlesProps {
  particleCount?: number;
  particleSize?: number;
  accentColor?: string;
  baseColor?: string;
  className?: string;
  pointerMode?: 'repel' | 'attract' | 'magnetic';
  pointerRadius?: number;
  pointerStrength?: number;
  rootRef?: React.RefObject<HTMLElement | null>;
}

export default function SphereParticles({
  particleCount = 8000,
  particleSize = 1.8,
  accentColor = '#ffffff', // White
  baseColor = '#e8e8e8', // Light gray/white
  className = '',
  pointerMode = 'repel', // Changed to match CrazyGL demo
  pointerRadius = 0.6,
  pointerStrength = 1, // Reset to CrazyGL value
  rootRef,
}: SphereParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const globalPointer = useRef({ x: 0, y: 0, moved: false });

  // Window-level pointer tracking (particles react anywhere on page)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      globalPointer.current.x = e.clientX;
      globalPointer.current.y = e.clientY;
      globalPointer.current.moved = true;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('[sphere-particles] No canvas element found');
      return;
    }

    // console.log('[sphere-particles] Initializing sphere particles');

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) {
      console.error('[sphere-particles] no webgl2');
      return;
    }

    // Vertex shader
    const VERT = `#version 300 es
      in vec3 a_pos;
      in vec3 a_col;
      in float a_size;
      uniform mat4 u_mvp;
      uniform mat4 u_mv;
      uniform float u_dpr;
      uniform float u_pointScale;
      out vec3 v_col;
      out float v_fade;
      void main() {
        vec4 mv = u_mv * vec4(a_pos, 1.0);
        float depth = -mv.z;
        gl_Position = u_mvp * vec4(a_pos, 1.0);
        float sz = a_size * u_dpr * u_pointScale * (3.4 / max(depth, 0.25));
        gl_PointSize = clamp(sz, 1.0, 46.0);
        float df = smoothstep(8.5, 2.0, depth);
        v_fade = mix(0.65, 1.0, df); // Increased from 0.28 for higher opacity
        v_col = a_col;
      }`;

    // Fragment shader
    const FRAG = `#version 300 es
      precision highp float;
      in vec3 v_col;
      in float v_fade;
      out vec4 outColor;
      void main() {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float r2 = dot(p, p);
        if (r2 > 1.0) discard;
        float a = exp(-r2 * 2.4) * v_fade;
        outColor = vec4(v_col, a);
      }`;

    // Compile shaders
    const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[sphere-particles]', gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const program = (gl: WebGL2RenderingContext, vs: string, fs: string) => {
      const v = compile(gl, gl.VERTEX_SHADER, vs);
      const f = compile(gl, gl.FRAGMENT_SHADER, fs);
      if (!v || !f) return null;
      const p = gl.createProgram()!;
      gl.attachShader(p, v);
      gl.attachShader(p, f);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('[sphere-particles] link', gl.getProgramInfoLog(p));
        return null;
      }
      return p;
    };

    const prog = program(gl, VERT, FRAG);
    if (!prog) return;

    // Constants
    const count = Math.max(400, Math.min(10000, Math.round(particleCount)));
    const stiff = 26.0;
    const damp = 2 * Math.sqrt(stiff) * 0.92;

    // Particle arrays
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const tcol = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const pr = new Float32Array(count * 4);

    // Random seed
    const mulberry32 = (seed: number) => {
      let a = seed >>> 0;
      return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };
    const rnd = mulberry32(0x9e3779b1 ^ count);

    // Helper functions
    const hash2 = (x: number, y: number) => {
      let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return (h - Math.floor(h)) * 2 - 1;
    };

    const vnoise = (x: number, y: number) => {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
      const a = hash2(xi, yi), b = hash2(xi + 1, yi);
      const c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };

    const hexToRgb = (hex: string): [number, number, number] => {
      const h = String(hex || '').replace('#', '').trim();
      const f = h.length === 3 ? h.split('').map((x) => x + x).join('') : h.padEnd(6, '0').slice(0, 6);
      const n = parseInt(f, 16);
      if (!Number.isFinite(n)) return [1, 1, 1];
      return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    };

    const accent = hexToRgb(accentColor);
    const base = hexToRgb(baseColor);
    const red = hexToRgb('#D00000'); // Brand red
    const gold = hexToRgb('#E8B547'); // Brand gold

    // Initialize particles as random cloud
    for (let i = 0; i < count; i++) {
      pr[i * 4] = rnd();
      pr[i * 4 + 1] = rnd();
      pr[i * 4 + 2] = rnd();
      pr[i * 4 + 3] = rnd();

      const a = rnd() * Math.PI * 2;
      const b = Math.acos(rnd() * 2 - 1);
      const r = 1.6 + rnd() * 1.2;
      pos[i * 3] = Math.sin(b) * Math.cos(a) * r;
      pos[i * 3 + 1] = Math.cos(b) * r;
      pos[i * 3 + 2] = Math.sin(b) * Math.sin(a) * r;
      size[i] = 0.6 + pr[i * 4] * 0.9;
      col[i * 3] = base[0];
      col[i * 3 + 1] = base[1];
      col[i * 3 + 2] = base[2];
    }

    // Build sphere targets (Fibonacci sphere)
    const R = 1.6; // Increased from 1.25 for larger sphere
    const GA = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const th = GA * i;
      const sp = Math.sin(phi);
      target[i * 3] = sp * Math.cos(th) * R;
      target[i * 3 + 1] = Math.cos(phi) * R;
      target[i * 3 + 2] = sp * Math.sin(th) * R;

      // Color gradient - some particles are red or gold
      const t = 0.25 + pr[i * 4] * 0.5;
      const isRed = pr[i * 4 + 1] < 0.15; // 15% of particles are red
      const isGold = pr[i * 4 + 1] < 0.28 && pr[i * 4 + 1] >= 0.15; // 13% of particles are gold
      if (isRed) {
        tcol[i * 3] = red[0];
        tcol[i * 3 + 1] = red[1];
        tcol[i * 3 + 2] = red[2];
      } else if (isGold) {
        tcol[i * 3] = gold[0];
        tcol[i * 3 + 1] = gold[1];
        tcol[i * 3 + 2] = gold[2];
      } else {
        tcol[i * 3] = base[0] + (accent[0] - base[0]) * t;
        tcol[i * 3 + 1] = base[1] + (accent[1] - base[1]) * t;
        tcol[i * 3 + 2] = base[2] + (accent[2] - base[2]) * t;
      }
    }

    // Create buffers
    const posBuf = gl.createBuffer();
    const colBuf = gl.createBuffer();
    const sizeBuf = gl.createBuffer();
    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
    gl.bufferData(gl.ARRAY_BUFFER, col, gl.DYNAMIC_DRAW);
    const aCol = gl.getAttribLocation(prog, 'a_col');
    gl.enableVertexAttribArray(aCol);
    gl.vertexAttribPointer(aCol, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuf);
    gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);
    const aSize = gl.getAttribLocation(prog, 'a_size');
    gl.enableVertexAttribArray(aSize);
    gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);

    // Matrix helpers
    const perspective = (out: Float32Array, fovy: number, aspect: number, near: number, far: number) => {
      const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
      out.fill(0);
      out[0] = f / aspect;
      out[5] = f;
      out[10] = (far + near) * nf;
      out[11] = -1;
      out[14] = 2 * far * near * nf;
    };

    const mul = (out: Float32Array, a: Float32Array, b: Float32Array) => {
      for (let i = 0; i < 4; i++) {
        const ai0 = a[i], ai1 = a[i + 4], ai2 = a[i + 8], ai3 = a[i + 12];
        out[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
        out[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
        out[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
        out[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
      }
    };

    const modelMatrix = (out: Float32Array, yaw: number, pitch: number) => {
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch);
      out[0] = cy;
      out[1] = sy * sx;
      out[2] = -sy * cx;
      out[3] = 0;
      out[4] = 0;
      out[5] = cx;
      out[6] = sx;
      out[7] = 0;
      out[8] = sy;
      out[9] = -cy * sx;
      out[10] = cy * cx;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
    };

    // Matrices
    const camZ = 4.2;
    const view = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -camZ, 1]);
    const proj = new Float32Array(16);
    const model = new Float32Array(16);
    const mv = new Float32Array(16);
    const mvp = new Float32Array(16);
    const tmp = new Float32Array(16);

    // Animation state
    let energy = 1.2; // Initial assembly burst
    let startTime = performance.now();

    // Pointer tracking
    const pointerSmooth = { x: 0.5, y: 0.5, active: 0 };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      const time = (performance.now() - startTime) / 1000;
      const dt = 0.016; // Fixed timestep

      // Resize canvas
      const width = canvas.clientWidth || 380;
      const height = canvas.clientHeight || 380;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const bw = Math.round(width * dpr);
      const bh = Math.round(height * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
        gl.viewport(0, 0, bw, bh);
      }

      // Smooth pointer - calculate from global pointer relative to bounds
      const bounds = canvas.getBoundingClientRect();
      const gp = globalPointer.current;
      let tx = 0.5, ty = 0.5, active = 0;

      if (bounds && gp.moved) {
        tx = (gp.x - bounds.left) / Math.max(1, width);
        ty = (gp.y - bounds.top) / Math.max(1, height);
        active = 1;

        // Debug log occasionally
        // if (Math.random() < 0.05) {
        //   console.log('[sphere-particles] Pointer tracked:', {
        //     globalPointer: { x: gp.x, y: gp.y, moved: gp.moved },
        //     bounds: { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height },
        //     normalized: { x: tx.toFixed(3), y: ty.toFixed(3), active }
        //   });
        // }
      }

      const pk = 1 - Math.exp(-dt / 0.05);
      pointerSmooth.x += (tx - pointerSmooth.x) * pk;
      pointerSmooth.y += (ty - pointerSmooth.y) * pk;
      pointerSmooth.active += (active - pointerSmooth.active) * pk;

      // Fixed orientation (CrazyGL: basePitch so sphere faces camera)
      const basePitch = 0.42;
      modelMatrix(model, 0, basePitch);
      perspective(proj, 0.95, bw / Math.max(1, bh), 0.1, 100);
      mul(tmp, view, model);
      mv.set(tmp);
      mul(mvp, proj, tmp);

      // Simulate particles
      const shimmer = 0.5 + energy * 1.2;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        let px = pos[i3];
        let py = pos[i3 + 1];
        let pz = pos[i3 + 2];
        let vx = vel[i3];
        let vy = vel[i3 + 1];
        let vz = vel[i3 + 2];
        const tgx = target[i3];
        const tgy = target[i3 + 1];
        const tgz = target[i3 + 2];

        // Spring to target
        let ax = (tgx - px) * stiff - vx * damp;
        let ay = (tgy - py) * stiff - vy * damp;
        let az = (tgz - pz) * stiff - vz * damp;

        // Shimmer
        if (shimmer > 0.001) {
          const r0 = pr[i * 4];
          const r1 = pr[i * 4 + 1];
          ax += vnoise(py * 1.5 + time * 0.4 + r0 * 9, pz * 1.5) * shimmer;
          ay += vnoise(pz * 1.5 + time * 0.35 + r1 * 9, px * 1.5) * shimmer;
          az += vnoise(px * 1.5 + time * 0.45, py * 1.5 + r0 * 9) * shimmer;
        }

        // Pointer interaction using CrazyGL ray-based approach
        if (pointerSmooth.active > 0.01) {
          const pStr = (pointerStrength ?? 1) * pointerSmooth.active;
          const pRad = Math.max(0.15, pointerRadius);
          const pRad2 = pRad * pRad;

          // Debug logging
          // if (Math.random() < 0.1) {
          //   console.log('[sphere-particles] Interaction active:', {
          //     pointerSmooth: { x: pointerSmooth.x.toFixed(3), y: pointerSmooth.y.toFixed(3), active: pointerSmooth.active.toFixed(3) },
          //     pStr: pStr.toFixed(3),
          //     pRad: pRad.toFixed(3),
          //     canvasSize: { width: canvas.width, height: canvas.height, clientWidth: canvas.clientWidth, clientHeight: canvas.clientHeight }
          //   });
          // }

          // Build cursor ray from camera through NDC cursor position (CrazyGL formula)
          const tanHalf = Math.tan(0.95 / 2);
          const ndcX = pointerSmooth.x * 2 - 1;
          const ndcY = -(pointerSmooth.y * 2 - 1); // CrazyGL exact formula
          const aspect = bw / Math.max(1, bh);

          // Direction in world space (from camera)
          let dwx = ndcX * tanHalf * aspect;
          let dwy = ndcY * tanHalf;
          let dwz = -1;
          const dlen = Math.hypot(dwx, dwy, dwz);
          dwx /= dlen;
          dwy /= dlen;
          dwz /= dlen;

          // Transform ray to LOCAL space (R^-1 = R^T for rotation matrix)
          const m = model;
          const camZ = 4.2;

          // Camera origin in LOCAL space - try positive camZ
          const Olx = m[0] * 0 + m[1] * 0 + m[2] * camZ;
          const Oly = m[4] * 0 + m[5] * 0 + m[6] * camZ;
          const Olz = m[8] * 0 + m[9] * 0 + m[10] * camZ;

          // Ray direction in LOCAL space
          const Dlx = m[0] * dwx + m[1] * dwy + m[2] * dwz;
          const Dly = m[4] * dwx + m[5] * dwy + m[6] * dwz;
          const Dlz = m[8] * dwx + m[9] * dwy + m[10] * dwz;

          // Perpendicular distance from particle to ray
          const toPartX = px - Olx;
          const toPartY = py - Oly;
          const toPartZ = pz - Olz;

          const tdot = toPartX * Dlx + toPartY * Dly + toPartZ * Dlz; // projection onto ray
          const perpX = Dlx * tdot - toPartX; // Negated to fix opposite side
          const perpY = Dly * tdot - toPartY;
          const perpZ = Dlz * tdot - toPartZ;

          const d2 = perpX * perpX + perpY * perpY + perpZ * perpZ;

          if (d2 < pRad2) {
            const d = Math.sqrt(d2) + 1e-4;
            const fall = (1 - d2 / pRad2);
            const f = fall * fall * 100 * pStr; // Increased from 52 for more visible effect

            // Normal vector away from the ray (perpendicular direction)
            const nx = perpX / d;
            const ny = perpY / d;
            const nz = perpZ / d;

            // Apply force based on pointer mode
            if (pointerMode === 'repel') {
              ax -= nx * f; // Inverted direction
              ay -= ny * f;
              az -= nz * f;
            } else if (pointerMode === 'attract') {
              ax += nx * f * 0.75; // Inverted direction
              ay += ny * f * 0.75;
              az += nz * f * 0.75;
            } else {
              // Magnetic mode: swirl around the ray axis (tangent = ray × perp)
              const tx = Dly * nz - Dlz * ny;
              const ty = Dlz * nx - Dlx * nz;
              const tz = Dlx * ny - Dly * nx;
              ax += tx * f * 0.95 + nx * f * 0.18;
              ay += ty * f * 0.95 + ny * f * 0.18;
              az += tz * f * 0.95 + nz * f * 0.18;
            }
          }
        }

        vx += ax * dt;
        vy += ay * dt;
        vz += az * dt;
        px += vx * dt;
        py += vy * dt;
        pz += vz * dt;

        pos[i3] = px;
        pos[i3 + 1] = py;
        pos[i3 + 2] = pz;
        vel[i3] = vx;
        vel[i3 + 1] = vy;
        vel[i3 + 2] = vz;

        // Color easing
        const colSpeed = 1 - Math.exp(-dt / 0.5);
        col[i3] += (tcol[i3] - col[i3]) * colSpeed;
        col[i3 + 1] += (tcol[i3 + 1] - col[i3 + 1]) * colSpeed;
        col[i3 + 2] += (tcol[i3 + 2] - col[i3 + 2]) * colSpeed;
      }

      // Decay energy
      energy = Math.max(0, energy - dt * 0.4);

      // Draw
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.disable(gl.DEPTH_TEST);

      gl.useProgram(prog);
      gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'u_mvp'), false, mvp);
      gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'u_mv'), false, mv);
      gl.uniform1f(gl.getUniformLocation(prog, 'u_dpr'), dpr);
      gl.uniform1f(gl.getUniformLocation(prog, 'u_pointScale'), particleSize || 1);

      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, pos);
      gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, col);
      gl.drawArrays(gl.POINTS, 0, count);
      gl.bindVertexArray(null);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(colBuf);
      gl.deleteBuffer(sizeBuf);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
    };
  }, [particleCount, particleSize, accentColor, baseColor, pointerMode, pointerRadius, pointerStrength]);

  return (
    <div className={`sphere-particles-wrapper ${className}`}>
      {/* This component was inspired and implemented based on the implementation at https://crazygl.com/hero/particle-slider */}
      {/* Original implementation by @ybouane https://x.com/ybouane */}
      <canvas
        ref={canvasRef}
        className="sphere-particles-canvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        width={380}
        height={380}
      />
    </div>
  );
}
