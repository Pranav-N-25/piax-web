// What the PIAX app does, for the website's app and AI sections. Taken from the live PIAX app
// (app.piax.co.in, Flutter build), worded for the website. Product claims and prices printed in the app
// (organic cotton, compostable, odour, 50% off with Premium, reseller margins) are deliberately left out:
// products follow productCatalog.json, and offers need commercial approval before the website repeats them.

export const appLinks = {
  web: 'https://app.piax.co.in',
  android: 'https://play.google.com/store/apps/details?id=in.co.piax.care',
}

// key: stable id; icon: a lucide-react icon name resolved by the component that renders it.
export const appFeatures = [
  {
    key: 'tracking', icon: 'CalendarHeart', title: 'Track your cycle',
    text: 'Log your last period once and see your cycle day, next period and fertile window — estimates that improve with every cycle you log.',
  },
  {
    key: 'daily-log', icon: 'NotebookPen', title: 'Daily log',
    text: 'Note flow, symptoms, mood, temperature, water and pad changes. Patterns show up as you log.',
  },
  {
    key: 'insights', icon: 'ChartLine', title: 'Patterns & insights',
    text: 'Cycle history, cycle-length statistics and symptom patterns, from the dates and symptoms you log.',
  },
  {
    key: 'reminders', icon: 'Bell', title: 'Gentle reminders',
    text: 'Pad changes, period start, pills, water and daily check-ins — set the ones you want.',
  },
  {
    key: 'ai', icon: 'MessageCircleHeart', title: 'Ask PIAX AI',
    text: 'Quick answers on cycles, cramps, workouts and diet. General information, not medical advice.',
  },
  {
    key: 'doctors', icon: 'Stethoscope', title: 'Talk to a specialist',
    text: 'Book a private consultation with a gynaecologist about symptoms, irregular cycles or period pain.',
  },
  {
    key: 'quick-delivery', icon: 'Zap', title: 'Emergency pad delivery',
    text: 'Order from the nearest PIAX partner store and a rider brings it to you. The arrival estimate is shown before you pay.',
  },
  {
    key: 'stores', icon: 'MapPin', title: 'Find nearby stores',
    text: 'See partner stores and pharmacies near you that stock PIAX.',
  },
  {
    key: 'chat', icon: 'MessagesSquare', title: 'Private chat with friends',
    text: 'Invite friends with a code or QR. Messages and calls are end-to-end encrypted.',
  },
  {
    key: 'privacy', icon: 'ShieldCheck', title: 'Your data, your control',
    text: 'Discreet mode keeps your home screen subtle. Copy everything the app keeps about you, or delete it all.',
  },
]

// Specialist PIAX AI assistants in the app.
export const aiAssistants = ['Cycle Care', 'Comfort Bot', 'Eco Guard', 'Quick OrderBot', 'Fit Flow', 'Hydro Helper', 'Wellness Wiz', 'Support Sphere']

// The app's own AI disclaimer, repeated wherever PIAX AI is promoted.
export const aiDisclaimer = 'PIAX AI gives general information, not medical advice. For diagnosis or treatment, consult a healthcare professional. In an emergency, call 112.'

export const appFeature = (key) => appFeatures.find((feature) => feature.key === key)
