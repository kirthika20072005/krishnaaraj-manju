/* ==========================================================================
   SITE CONFIG  —  ✏️  THIS IS THE FILE YOU EDIT FIRST.
   --------------------------------------------------------------------------
   Everything here is safe to change. Just replace the text between the '...'
   quotes with your own words. Do not remove the commas or the {} braces.
   ========================================================================== */

export const site = {
  /* ---------------------------------------------------------------- NAMES */
  // His name — shown all over the site.
  hisName: 'Krishnaaraj',
  // A short nickname / pet name (optional). Used for the opening screen.
  hisNickname: 'Krishnaaa',
  // Your name — used in signatures and the certificate.
  myName: 'Manju',

  // Shown as the browser tab title.
  siteTitle: 'A Little Universe, Made Just for You',

  /* ------------------------------------------------------------ OPENING */
  opening: {
    // The first line he sees.
    line1: 'Someone has a little surprise for you…',
    // The question under it.
    line2: 'Are you ready to open a piece of my heart?',
    // The button text.
    button: 'Open Your Surprise',
    // A birthday line shown on top of the note.
    birthdayLine: 'Happy Birthday Krishnaaa! 🎉🎂💖',
    // The short handwritten note revealed when the envelope opens.
    letter:
      'Hey you. Yes, you. I built this whole little world just to tell you something ' +
      'I never say often enough — I am so glad the universe let our paths cross.',
  },

  /* -------------------------------------------------------------- HERO */
  hero: {
    // Small line above his name.
    eyebrow: 'Happy Birthday',
    // The birthday message.
    message: 'Happy Birthday to the boy who became my favorite part of every day.',
    // A softer sub-line.
    subline:
      'This is a tiny universe I made for you. Take your time. Look around. It is all yours.',
    // Button that scrolls to the story.
    cta: 'Begin Our Story',
  },

  /* ------------------------------------------------ DATES & TIMERS */
  // Your birthday countdown / elapsed timer.
  // Use YYYY-MM-DD. If this date is in the FUTURE the site shows a live
  // countdown. If it is TODAY it celebrates. If it is in the PAST it shows a
  // counter of how long it has been since that date.
  // Tip: set this to his NEXT birthday so the countdown always works.
  birthdayDate: '2026-10-15T00:00:00',

  // When the two of you met (or started dating). Used for the
  // "we have been us for…" counter. Use YYYY-MM-DD.
  ourDate: '2023-02-14T00:00:00',

  countdownLabels: {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
  },

  /* -------------------------------------------------------------- VIDEO */
  video: {
    // Section heading + a short line shown above the player.
    heading: 'A Movie of Small, Perfect Moments',
    title: 'Us, in Motion',
    // Put your edited video in:  public/media/video/our-movie.mp4
    // Then this path is enough (do NOT write /public).
    // DEPLOY NOTE (Vercel): git/GHub rejects files >100MB and Vercel is slow
    // with huge MP4s. Your current file is ~177MB, so it never reached Vercel.
    // Compress to <30MB with faststart (see below), or host externally and
    // put the https URL here, e.g. src: 'https://.../our-movie.mp4'.
    // ffmpeg: ffmpeg -i our-movie.mp4 -vcodec libx264 -crf 23 -preset medium
    //   -acodec aac -b:a 128k -movflags +faststart -vf scale=-2:720 our-movie-small.mp4
    src: '/media/video/our-movie.mp4',
    // A poster image shown before playing. Optional — set to null to skip.
    // Put it in: public/media/video/our-movie-poster.jpg
    // (missing poster no longer breaks the player; it is hidden gracefully).
    poster: '/media/video/our-movie-poster.svg',
    // Intro shown before the video plays.
    intro:
      'I edited this for us. It is not perfect, but it is ours — and that is my favorite kind of thing.',
    caption: 'My favorite movie will always be the one where you are in it.',
  },

  /* --------------------------------------------------------------- GIFT */
  gift: {
    title: 'This is the real gift.',
    message:
      'It was never a thing I could wrap. It is just this: every day with you, every ordinary ' +
      'morning, every late-night talk. You, exactly as you are, are the best thing that ever ' +
      'happened to me.',
    ps: 'There is more — keep scrolling.',
  },

  /* -------------------------------------------------------------- MUSIC */
  music: {
    // Put a royalty-free track in:  public/media/music/our-song.mp3
    // Music NEVER autoplays — he chooses to turn it on.
    src: '/media/music/our-song.mp3',
    title: 'Our little soundtrack',
    // 0 to 1. Keep it gentle.
    volume: 0.28,
  },

  /* ------------------------------------------------------------ GALLERY */
  // Shown in the gallery header.
  galleryIntro:
    'A scrapbook of us — the ordinary afternoons, the silly faces, the days I never want to lose.',

  // Photo categories (keys match the `category` field in gallery.js).
  galleryCategories: [
    { id: 'best', label: 'Our Best Days' },
    { id: 'silly', label: 'Silly Moments' },
    { id: 'favorites', label: 'My Favorite Pictures' },
    { id: 'never-forget', label: 'Memories I Never Want to Forget' },
  ],

  /* ------------------------------------------------------ CERTIFICATE */
  certificate: {
    // A decorative, unique-looking identifier.
    number: 'NO. LOVE-2026-0001',
    // Where and "when" the promise is signed (shown on the certificate).
    place: 'Signed under the same sky',
    // Titles inside the certificate.
    title: 'THE FOREVER PROMISE',
    subtitle: 'A Promise Made by Two Hearts',
    // The opening paragraph of the certificate.
    body:
      'This is not a contract, and no court could ever hold it — it is something softer and ' +
      'stronger than that. It is a promise made freely, between two people, on a perfectly ' +
      'ordinary day that somehow felt like it mattered.',
    // The promises themselves. Add or remove lines freely.
    promises: [
      'To be gentle with your heart, and honest, even when it is hard.',
      'To cheer loudest for your dreams, and stay beside you when they scare us.',
      'To choose you on the easy days and the messy ones alike.',
      'To keep making you laugh, and to keep choosing to stay.',
    ],
    // A closing line above the signatures.
    closing: 'We promise, freely and gladly, to keep becoming us.',
    // Small print at the bottom.
    fine: 'Voluntary. From the heart. No expiry date.',
  },

  /* ----------------------------------------------------------- FINAL */
  final: {
    // A real photo from the gallery. Keep it under public/media/images/ours/.
    photo: '/media/images/ours/photo-19.jpg',
    lines: [
      'If I could choose a thousand times, I would still want to know you, laugh with you, grow with you, and make memories with you.',
      'Thank you for being part of my story.',
      'Today is your birthday, but somehow, I feel like I am the one who received the most beautiful gift.',
    ],
    closing: 'Happy Birthday, My Favorite Person.',
    remember:
      'And if there is one thing I want you to remember after closing this little website, it is this:',
    rememberBig:
      'You are loved, you are appreciated, and you are someone I will always be grateful to have met.',
    signatureLine: 'Forever yours,',
    replay: 'Replay Our Little Universe',
  },
}

export default site
