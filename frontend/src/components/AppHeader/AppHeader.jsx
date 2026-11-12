import React from 'react'

const SECTIONS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience & Projects' },
  { href: '#ideas', label: 'Ideas' },
]

const AppHeader = () => (
  <header className="hero">
    <div className="hero-aurora" aria-hidden="true">
      <div className="base one"></div>
      <div className="base two"></div>
      <div className="base three"></div>
      <div className="base four"></div>
    </div>
    <div className="hero-inner">
      <p className="hero-eyebrow">Software engineer · Boston</p>
      <h1 className="hero-title">
        Hi! I’m Ethan.
        <span className="hero-title-sub">This is what I do.</span>
      </h1>
      <nav className="hero-nav" aria-label="Sections">
        {SECTIONS.map((s) => (
          <a key={s.href} href={s.href}>{s.label}</a>
        ))}
      </nav>
    </div>
  </header>
)

export default AppHeader
