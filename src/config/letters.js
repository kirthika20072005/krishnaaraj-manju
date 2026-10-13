/* ==========================================================================
   LOVE LETTERS  —  ✏️  Edit the words. These are here to move you, not to
   be copied word-for-word — make them yours.
   --------------------------------------------------------------------------
   Each letter has:
     id       : internal name (leave as is)
     label    : what is printed on the sealed envelope
     hint     : the small line under it
     openWhen : the heading inside the opened letter
     greeting : the handwritten "Dear ..." line
     body     : an array of paragraphs (each string is one paragraph)
     signoff  : the handwritten closing line
     special  : true for the long birthday letter (gets a golden look)
   ========================================================================== */

export const letters = [
  {
    id: 'miss',
    label: 'Open When You Miss Me',
    hint: 'For the days distance feels too loud.',
    openWhen: 'For when you miss me',
    greeting: 'My love,',
    body: [
      'If you are reading this, it means a little space has opened between us — a few hours, a few days, maybe just a quiet evening when the room feels bigger than it should.',
      'So here is what I want you to know: missing someone is not a sad thing. It is just love with nowhere to go for a moment. It means what we have is real enough to notice when it is not right next to us.',
      'Look around you. The same sky is over both of us. The same moon. Whatever is between us right now, it is only distance. It was never going to be bigger than what we are.',
      'I am thinking of you too. I promise. Always am.',
    ],
    signoff: 'Come back to me soon.',
    special: false,
  },
  {
    id: 'sad',
    label: 'Open When You Feel Sad',
    hint: 'For the heavy days. Read slowly.',
    openWhen: 'For when you feel sad',
    greeting: 'Hey you,',
    body: [
      'First — you do not have to be okay right now. You are allowed to feel exactly what you feel, for as long as you need. I am not going to rush you out of it.',
      'Second — whatever it is, you are not carrying it alone. Even if I cannot fix it, I can sit beside you in it. That counts for something, I hope.',
      'You are so much stronger than the version of you that is hurting right now can see. I have watched you get through things before. You always come back to yourself, and you will this time too.',
      'Be as gentle with yourself as you would be with someone you love. Because you are someone I love. That has not changed, and it will not.',
    ],
    signoff: 'I am here. Always.',
    special: false,
  },
  {
    id: 'hug',
    label: 'Open When You Need a Hug',
    hint: 'A hug, folded into words.',
    openWhen: 'For when you need a hug',
    greeting: 'Come here,',
    body: [
      'Imagine this: my arms around you, your head somewhere near my shoulder, and neither of us saying anything for a while. That quiet kind of hug. The one that does not need explaining.',
      'Breathe in. Hold it a second. Let it out slowly. That is it. You are doing it right.',
      'I wish I could be there to hold you properly — but until I can, know that the safest place I know is right next to you, and I would choose it every single time.',
      'You are held, even when I am not in the room.',
    ],
    signoff: 'Tighter and longer than a text can say.',
    special: false,
  },
  {
    id: 'birthday',
    label: 'Open on Your Birthday',
    hint: 'Today is your day. This one is long — stay with it.',
    openWhen: 'For your birthday',
    greeting: 'Happy Birthday, my favorite person.',
    body: [
      'I have started this letter a dozen times. Not because I did not know what to say, but because everything I wanted to say did not feel big enough for you.',
      'So let me just begin with the truest thing: I am so grateful you were born. Somewhere, years ago, a day happened that made the entire rest of my life better — and I did not even know it yet. That is you. Your birthday is not just a date on a calendar to me. It is the day the world got someone I would one day need.',
      'Thank you for your patience with me. Thank you for the way you listen, even when I am rambling. Thank you for making me laugh when I did not feel like laughing, and for sitting with me quietly when laughing was not what I needed.',
      'I think about the little things more than you know. The way you say my name. The look you get when you are excited about something small. The way ordinary days turn into good ones just because you are in them. I keep those. I keep all of them.',
      'I am not going to pretend every day has been easy, because love is not a highlight reel — it is showing up on the quiet, unglamorous days too. And that is the part I am proudest of: that on the days it took effort, we still chose each other.',
      'So here is my wish for you this year. I hope you are proud of the person you are becoming. I hope you are kind to yourself — as kind as you are to everyone else. I hope the things you are quietly working toward start working out. I hope you laugh until your stomach hurts, often, and I hope I am there for most of it.',
      'And here is my promise for the year ahead: I will keep learning you. I will keep cheering for you. I will keep making you try new food, keep sending you things that remind me of you, keep being the person who chooses you on purpose, not by accident.',
      'We have so many memories left to make — trips we have not taken, songs we have not danced to, silly arguments about nothing, inside jokes no one else will ever understand. I cannot wait for all of it. Not just the big moments. Especially the small ones.',
      'You are the best thing I did not plan for. And I would do all of it — every confusing, beautiful, unexpected part — again, exactly the same way, if it led me back to you.',
      'Thank you for being born. Thank you for being you. Thank you for letting me love you.',
    ],
    signoff: 'With all my heart, today and every day after.',
    special: true,
  },
  {
    id: 'last',
    label: 'One Last Letter — Read Until the End',
    hint: 'The one I would want you to keep.',
    openWhen: 'Read this one until the end',
    greeting: 'To the person reading this,',
    body: [
      'You made it. Through the little universe, the photos, the memories, the letters — you are here, at the last one. I hope some of it made you smile. I hope some of it made you feel seen.',
      'I did not build this to show off. I built it because there are some things too big for a text message and too soft for an ordinary day. Some love just needs more room than a sentence gives it.',
      'So maybe this is less a letter and more a promise. When this page closes, none of it disappears. The photos are still ours. The memories are still ours. The promise is still ours. I will still be here, choosing you, on the plainest Tuesday, when nothing special is happening at all.',
      'If you ever doubt it — come back. Open this again. Scroll to the very end and sign our promise one more time. It will still say the same thing it says today: you are loved, and there is no version of my life I would trade for the one with you in it.',
      'Thank you for being my favorite person. I hope you know, always, that it was never a hard choice. It was just always you.',
    ],
    signoff: 'Yours, completely and quietly.',
    special: false,
  },
]

export default letters
