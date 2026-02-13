import { useEffect, useRef } from 'react'

export default function CircuitCanvas() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = 400, H = 360
    canvas.width = W * 2
    canvas.height = H * 2
    ctx.scale(2, 2)

    const nodes = [
      { x: 200, y: 180, r: 22, color: '#c8a2ff', type: 'core' },
      { x: 80,  y: 70,  r: 10, color: '#78dce8', type: 'node' },
      { x: 320, y: 70,  r: 10, color: '#78dce8', type: 'node' },
      { x: 50,  y: 180, r: 8,  color: '#a9dc76', type: 'node' },
      { x: 350, y: 180, r: 8,  color: '#a9dc76', type: 'node' },
      { x: 80,  y: 290, r: 10, color: '#ffab70', type: 'node' },
      { x: 320, y: 290, r: 10, color: '#ffab70', type: 'node' },
      { x: 140, y: 100, r: 7,  color: '#ff7eb6', type: 'node' },
      { x: 260, y: 100, r: 7,  color: '#ff7eb6', type: 'node' },
      { x: 140, y: 260, r: 7,  color: '#c8a2ff', type: 'node' },
      { x: 260, y: 260, r: 7,  color: '#c8a2ff', type: 'node' },
      { x: 200, y: 50,  r: 6,  color: '#78dce8', type: 'node' },
      { x: 200, y: 310, r: 6,  color: '#ffab70', type: 'node' },
      { x: 130, y: 180, r: 6,  color: '#a9dc76', type: 'node' },
      { x: 270, y: 180, r: 6,  color: '#a9dc76', type: 'node' },
    ]

    const edges = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
      [0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],
      [1,7],[7,11],[11,8],[8,2],
      [3,13],[13,14],[14,4],
      [5,9],[9,12],[12,10],[10,6],
      [1,3],[2,4],[5,3],[6,4],
    ]

    let t = 0

    function draw() {
      ctx.clearRect(0, 0, W, H)
      t += 0.006

      const offsets = nodes.map((_, i) => ({
        dx: Math.sin(t * 1.1 + i * 0.9) * 4,
        dy: Math.cos(t * 0.8 + i * 0.7) * 4,
      }))

      edges.forEach(([a, b]) => {
        const ax = nodes[a].x + offsets[a].dx
        const ay = nodes[a].y + offsets[a].dy
        const bx = nodes[b].x + offsets[b].dx
        const by = nodes[b].y + offsets[b].dy
        const pulse = (Math.sin(t * 2.5 + a + b) + 1) / 2

        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = `rgba(200, 162, 255, ${0.06 + pulse * 0.1})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        const pt = (t * 0.4 + a * 0.12 + b * 0.08) % 1
        const px = ax + (bx - ax) * pt
        const py = ay + (by - ay) * pt
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 162, 255, ${0.2 + pulse * 0.5})`
        ctx.fill()
      })

      nodes.forEach((node, i) => {
        const nx = node.x + offsets[i].dx
        const ny = node.y + offsets[i].dy
        const pulse = (Math.sin(t * 1.8 + i) + 1) / 2

        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.r * 3)
        grd.addColorStop(0, node.color + '15')
        grd.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(nx, ny, node.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(nx, ny, node.r + pulse * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#0f0f0f'
        ctx.fill()
        ctx.strokeStyle = node.color + '88'
        ctx.lineWidth = 1.2
        ctx.stroke()

        if (node.type === 'core') {
          ctx.fillStyle = '#c8a2ff'
          ctx.font = '700 16px Figtree, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('N', nx, ny)
        }
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ width: 400, height: 360 }} />
}
