import { useEffect, useState } from 'react'
import site from './config/site.js'
import OpeningScreen from './components/OpeningScreen.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import SiteNav from './components/SiteNav.jsx'
import MusicControl from './components/MusicControl.jsx'
import Hero from './components/Hero.jsx'
import StoryTimeline from './components/StoryTimeline.jsx'
import Gallery from './components/Gallery.jsx'
import MovieSection from './components/MovieSection.jsx'
import Letters from './components/Letters.jsx'
import Reasons from './components/Reasons.jsx'
import GiftBox from './components/GiftBox.jsx'
import Certificate from './components/Certificate.jsx'
import BucketList from './components/BucketList.jsx'
import FinalScene from './components/FinalScene.jsx'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'memories', label: 'Memories' },
  { id: 'movie', label: 'Our Movie' },
  { id: 'letters', label: 'Letters' },
  { id: 'reasons', label: 'Reasons' },
  { id: 'gift', label: 'Gift' },
  { id: 'promise', label: 'Promise' },
  { id: 'future', label: 'Future' },
  { id: 'finale', label: 'Finale' },
]

export default function App() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (site.siteTitle) document.title = site.siteTitle
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setEntered(false)
  }

  return (
    <>
      {!entered && <OpeningScreen onEnter={() => setEntered(true)} />}

      {entered && (
        <>
          <ScrollProgress />
          <SiteNav items={NAV_ITEMS} />
          <MusicControl />

          <main className="app-main">
            <Hero onBegin={() => scrollTo('story')} />
            <StoryTimeline />
            <Gallery />
            <MovieSection />
            <Letters />
            <Reasons />
            <GiftBox />
            <Certificate />
            <BucketList />
            <FinalScene onReplay={replay} />
          </main>
        </>
      )}
    </>
  )
}
