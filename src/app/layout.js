import { PostHogProvider } from './providers/PostHogProvider'

export default function Layout({ children }) {
  return (
    <PostHogProvider>
      {children}
    </PostHogProvider>
  )
}
