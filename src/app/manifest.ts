//src/app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Easy Therapy",
    short_name: "EasyTherapy",
    description: "Mental health chatbot",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5c86a9",
    icons: [
      {
        src: "/clogo.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/clogo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }
}