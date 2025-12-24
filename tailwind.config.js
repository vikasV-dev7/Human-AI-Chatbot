export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Layout & containers
    "min-h-screen",
    "h-screen",
    "w-full",
    "max-w-2xl",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-3xl",
    "shadow",
    "shadow-md",
    "shadow-lg",
    "shadow-xl",
    "border",
    "border-2",

    // Text
    "text-white",
    "text-gray-800",
    "text-gray-600",
    "text-gray-100",
    "font-semibold",
    "font-bold",
    "text-sm",
    "text-lg",
    "text-3xl",

    // Gradients (VERY IMPORTANT)
    "bg-gradient-to-br",
    "bg-gradient-to-r",

    // Theme gradients
    "from-indigo-50",
    "via-purple-50",
    "to-pink-50",
    "from-blue-50",
    "via-cyan-50",
    "to-teal-50",
    "from-green-50",
    "via-emerald-50",
    "to-teal-50",
    "from-pink-50",
    "via-rose-50",
    "to-red-50",
    "from-orange-50",
    "via-amber-50",
    "to-yellow-50",

    // Primary buttons
    "from-purple-500",
    "to-pink-500",
    "from-purple-600",
    "to-pink-600",
    "from-blue-500",
    "to-cyan-500",
    "from-green-500",
    "to-emerald-500",
    "from-pink-500",
    "to-rose-500",
    "from-orange-500",
    "to-amber-500",

    // Backgrounds
    "bg-white",
    "bg-gray-800",
    "bg-gray-700",
    "bg-gray-100",
    "bg-purple-50",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
