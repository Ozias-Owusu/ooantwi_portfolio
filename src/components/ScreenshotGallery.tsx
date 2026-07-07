import type { Project, ProjectBrandTheme, ProjectScreenshot } from '@/data/projects'

interface ScreenshotGalleryProps {
  project: Project
}

function PhoneFrame({
  shot,
  theme,
}: {
  shot: ProjectScreenshot
  theme?: ProjectBrandTheme
}) {
  const primary = theme?.primary ?? 'var(--accent)'
  const secondary = theme?.secondary ?? 'var(--accent-2)'

  return (
    <figure className="group mx-auto w-full max-w-[280px]">
      <div
        className="relative rounded-[2rem] p-[3px] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(145deg, ${primary}, ${secondary})`,
        }}
      >
        <div className="overflow-hidden rounded-[1.85rem] bg-[#0f172a] p-2">
          <div className="mb-2 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-white/20" />
          </div>
          <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white">
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className="aspect-[430/932] w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
      {shot.caption && (
        <figcaption className="mt-4 text-center text-sm font-medium text-[var(--text-primary)]">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  )
}

function DesktopShot({ shot }: { shot: ProjectScreenshot }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]">
      <img
        src={shot.src}
        alt={shot.alt}
        loading="lazy"
        className="w-full object-cover object-top"
      />
      {shot.caption && (
        <figcaption className="border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  )
}

export default function ScreenshotGallery({ project }: ScreenshotGalleryProps) {
  const isMobile = project.screenshotLayout === 'mobile'
  const theme = project.brandTheme
  const sections = project.screenshotSections
  const flatShots = project.screenshots ?? []

  if (sections?.length && isMobile) {
    return (
      <div className="space-y-14">
        {sections.map((section) => (
          <section key={section.title}>
            <div
              className="mb-8 rounded-2xl border px-5 py-4 md:px-6"
              style={{
                borderColor: `${theme?.primary ?? '#4338CA'}33`,
                background: `linear-gradient(135deg, ${theme?.primary ?? '#4338CA'}14, ${theme?.secondary ?? '#0D9488'}10)`,
              }}
            >
              <h3
                className="font-display text-xl font-bold md:text-2xl"
                style={{ color: theme?.primary ?? 'var(--text-primary)' }}
              >
                {section.title}
              </h3>
              {section.subtitle && (
                <p className="mt-1 text-sm text-[var(--text-muted)]">{section.subtitle}</p>
              )}
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {section.items.map((shot) => (
                <PhoneFrame key={shot.src} shot={shot} theme={theme} />
              ))}
            </div>
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className={isMobile ? 'grid gap-10 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-6'}>
      {flatShots.map((shot) =>
        isMobile ? (
          <PhoneFrame key={shot.src} shot={shot} theme={theme} />
        ) : (
          <DesktopShot key={shot.src} shot={shot} />
        ),
      )}
    </div>
  )
}
