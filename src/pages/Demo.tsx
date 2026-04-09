import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import {
  Badge,
  Button,
  Card,
  Input,
  Stack,
  Text,
  ThemeToggle,
} from '../lib'
import '../App.css'

export default function Demo() {
  const [count, setCount] = useState(0)
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)

  return (
    <div className="demo-playground">
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <Card
          padding="lg"
          style={{ maxWidth: 520, width: '100%', textAlign: 'left' }}
        >
          <Stack gap="lg">
            <Stack
              direction="row"
              gap="md"
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Text variant="subtitle" as="h2">
                Themed components
              </Text>
              <ThemeToggle />
            </Stack>
            <Text variant="body" tone="muted">
              Semantic tokens and dark mode via StyleX{' '}
              <code style={{ fontSize: '0.9em' }}>createTheme</code>.
            </Text>
            <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
              <Badge>Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="outline">Outline</Badge>
            </Stack>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hint={showError ? undefined : 'We never share your email.'}
              error={showError ? 'Enter a valid email address.' : undefined}
            />
            <Stack direction="row" gap="sm">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => setShowError((v) => !v)}
              >
                Toggle validation
              </Button>
            </Stack>
          </Stack>
        </Card>

        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/pages/Demo.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <Button
          variant="primary"
          style={{ marginBottom: 24 }}
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}
