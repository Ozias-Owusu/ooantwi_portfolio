export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getProjectCoverPath(slug: string): string {
  return `/projects/${slug}-cover.svg`
}
