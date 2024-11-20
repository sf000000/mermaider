import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import templatesData from "@/app/data/templates.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomTemplate() {
  const templates = templatesData.templates
  const randomIndex = Math.floor(Math.random() * templates.length)
  return templates[randomIndex].code
}

export async function exportRasterImage(
  svgElement: SVGElement,
  format: "PNG" | "JPEG",
  scaleValue: number,
  background: string
) {
  const { width, height } = getDimensions(svgElement)
  const canvas = setupCanvas(width, height, scaleValue)
  await renderToCanvas(canvas, svgElement, background)
  downloadImage(canvas, format.toLowerCase() as "png" | "jpeg")
}

function getDimensions(svgElement: SVGElement) {
  const viewBox = svgElement.getAttribute("viewBox")
  if (viewBox) {
    const [, , w, h] = viewBox.split(" ").map(Number)
    return { width: w, height: h }
  }
  const svgGraphicsElement = svgElement as unknown as SVGGraphicsElement
  const bbox = svgGraphicsElement.getBBox()
  return { width: bbox.width, height: bbox.height }
}

function setupCanvas(width: number, height: number, scale: number) {
  const canvas = document.createElement("canvas")
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.scale(scale, scale)
  }
  return canvas
}

async function renderToCanvas(
  canvas: HTMLCanvasElement,
  svgElement: SVGElement,
  background: string
) {
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get canvas context")

  if (background !== "transparent") {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const svgBlob = new Blob([svgElement.outerHTML], { type: "image/svg+xml" })
  const url = URL.createObjectURL(svgBlob)
  const img = new Image()

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  URL.revokeObjectURL(url)
}

function downloadImage(canvas: HTMLCanvasElement, format: "png" | "jpeg") {
  const mimeType = `image/${format}`
  const dataUrl = canvas.toDataURL(mimeType, 0.95)
  const a = document.createElement("a")
  a.href = dataUrl
  a.download = `diagram.${format}`
  a.click()
}
