import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTestimonials } from '../../services/testimonials';
import { useAutoplay } from '../../hooks/useAutoplay';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialSlider: React.FC = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials', 'public'],
    queryFn: () => getTestimonials(true),
  });

  const { index, next, prev, goTo, hoverProps } = useAutoplay(testimonials.length, 6000);
  const currentTestimonial = testimonials[index];

  return (
    <section id="testimonials" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Apa kata mitra kami
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mt-1.5">
            Testimoni singkat dari aparatur desa, kepala sekolah, dan pelaku UMKM yang mengadopsi platform RynCode.
          </p>
        </div>

        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Testimoni sebelumnya"
              className="h-8 w-8 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center text-xs hover:border-emerald-400 hover:text-emerald-500 transition dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300 dark:hover:border-emerald-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Testimoni selanjutnya"
              className="h-8 w-8 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center text-xs hover:border-emerald-400 hover:text-emerald-500 transition dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300 dark:hover:border-emerald-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-8 animate-pulse h-36" />
      )}

      {!isLoading && testimonials.length > 0 && currentTestimonial && (
        <div {...hoverProps} className="space-y-4">
          <div className="relative rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/80 shadow-md">
            <Quote className="h-8 w-8 text-emerald-500/20 dark:text-emerald-500/30 mb-3" />
            <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-100 italic">
              "{currentTestimonial.quote}"
            </p>
          </div>

          <div className="flex items-center justify-between text-xs px-1">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {currentTestimonial.name}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {currentTestimonial.role}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ke testimoni ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    i === index ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
