import { Heart, Mail, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Watermark */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-4">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-white">Al-Baraa Mansour</span>
          </div>

          {/* Contact Links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:baraadev0@gmail.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 text-sm group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Email</span>
            </a>

            <a
              href="https://github.com/BaraaMansor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 text-sm group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/baraamansor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 text-sm group"
            >
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Decorative line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Copyright */}
        <div className="text-center mt-4 text-gray-500 text-xs">
          © {new Date().getFullYear()} TrackTide. Built for habit champions.
        </div>
      </div>
    </footer>
  )
}
