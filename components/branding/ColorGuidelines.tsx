interface ColorSwatchProps {
  name: string;
  hex: string;
  description: string;
  gradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

function ColorSwatch({ name, hex, description, gradient, gradientFrom, gradientTo }: ColorSwatchProps) {
  return (
    <div className="flex flex-col relative overflow-hidden rounded-lg shadow-sm">
      {/* Color Swatch */}
      <div 
        className="w-full h-20 rounded-t-lg"
        style={gradient ? {
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
        } : {
          backgroundColor: hex
        }}
        aria-label={`Color swatch for ${name}: ${hex}`}
      />
      {/* Info Card */}
      <div className="flex flex-col px-3 pt-4 pb-3 bg-white border border-[#e6e6e6] rounded-b-lg">
        <p className="text-sm font-bold text-[#535862] mb-1">
          {name}
        </p>
        <p className="text-sm text-[#535862] mb-1 font-mono">
          {hex}
        </p>
        <p className="text-xs text-[#535862] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ColorGuidelines() {
  const colors: ColorSwatchProps[] = [
    { name: 'Black', hex: '#0A0A0A', description: 'Primary background' },
    { name: 'White', hex: '#FFFFFF', description: 'Negative logo, text' },
    { name: 'Ink Mid', hex: '#E6E6E6', description: 'Secondary background' },
    { name: 'Ink Dim', hex: '#9CA3AF', description: 'Body text' },
    { name: 'Indigo', hex: '#6E45E2', description: 'Brand gradient (dark)' },
    { name: 'Azure', hex: '#3E7BFA', description: 'Brand gradient (light)' },
    { 
      name: 'Dark Purple', 
      hex: '#2B1E3B', 
      description: 'Brand gradient component',
      gradient: true,
      gradientFrom: '#0A0A0A',
      gradientTo: '#2B1E3B'
    },
    {
      name: 'Gradient',
      hex: 'Black → Dark Purple',
      description: 'Brand gradient',
      gradient: true,
      gradientFrom: '#0A0A0A',
      gradientTo: '#6E45E2'
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0a0a0a]">
            Color System
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-[#67707f] max-w-3xl mx-auto">
            Institutional monochrome base with a bold gradient accent.
          </p>
          <p className="text-base sm:text-lg text-[#67707f] leading-relaxed max-w-3xl mx-auto">
            AlphaTON&apos;s palette is designed for clarity and composure, centering
            on dark institutional tones with a single gradient accent for
            emphasis.
          </p>
        </div>
        
        {/* Color Swatches Grid - Centered */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl">
            {colors.map((color) => (
              <ColorSwatch key={color.name} {...color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

