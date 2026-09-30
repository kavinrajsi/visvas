// Import next/cache lazily so Payload collection/global configs (which import
// these helpers from hooks) still load outside the Next runtime: CLI scripts,
// `payload generate:types`, migrations.
export async function revalidateTags(...tags) {
  try {
    const { revalidateTag } = await import('next/cache')
    for (const tag of tags) revalidateTag(tag, 'max')
  } catch {
    // no-op outside the Next.js request/build context
  }
}

export async function revalidatePaths(...paths) {
  try {
    const { revalidatePath } = await import('next/cache')
    for (const path of paths) revalidatePath(path)
  } catch {
    // no-op outside the Next.js request/build context
  }
}
