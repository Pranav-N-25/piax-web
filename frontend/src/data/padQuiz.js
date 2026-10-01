// Find My Pad quiz: the questions and how answers turn into a recommendation.
//
// The questions lean on what people can answer reliably. "Heavy" means different things to different
// people, so flow is judged by how often a pad needs changing on the heaviest day. Night leaks and how
// often someone *can* change during the day decide whether they need more length than their flow alone
// suggests. Period length sizes the cycle kit. Nothing here is medical advice.
import { padById, pads } from './piaxRange.js'

export const questions = [
  {
    id: 'flow',
    question: 'On your heaviest day, how often do you change your pad?',
    why: 'Change frequency tells us far more about your flow than “light” or “heavy” does.',
    options: [
      { value: 0, label: 'Every 6+ hours', hint: 'It’s rarely full', drops: 1 },
      { value: 1, label: 'Every 4–6 hours', hint: 'A steady, regular flow', drops: 2 },
      { value: 2, label: 'Every 2–3 hours', hint: 'It fills up quickly', drops: 3 },
      { value: 3, label: 'Every 1–2 hours', hint: 'Or I double up', drops: 4 },
    ],
  },
  {
    id: 'night',
    question: 'Do you ever leak at night?',
    why: 'Lying down moves flow towards the back, so nights often need a longer pad.',
    options: [
      { value: 'never', label: 'Never', hint: 'My nights are fine', icon: 'moon' },
      { value: 'sometimes', label: 'Sometimes', hint: 'Usually at the back', icon: 'moon' },
      { value: 'often', label: 'Often', hint: 'I worry about my sheets', icon: 'moon' },
      { value: 'none', label: 'I don’t wear pads at night', hint: 'Days only', icon: 'sun' },
    ],
  },
  {
    id: 'change',
    question: 'Can you change easily during the day?',
    why: 'If you can’t change often, a longer pad keeps you covered between breaks.',
    options: [
      { value: 'anytime', label: 'Yes, whenever I need', hint: 'Home, office, college', icon: 'home' },
      { value: 'sometimes', label: 'Every few hours', hint: 'Between classes or meetings', icon: 'clock' },
      { value: 'rarely', label: 'Not often', hint: 'Long shifts, commutes or travel', icon: 'bus' },
    ],
  },
  {
    id: 'days',
    question: 'How many days does your period usually last?',
    why: 'This sizes your kit, so you have enough pads and nothing goes to waste.',
    options: [
      { value: 4, label: '3–4 days', icon: 'calendar' },
      { value: 6, label: '5–6 days', icon: 'calendar' },
      { value: 7, label: '7 days or more', icon: 'calendar' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    why: 'Every PIAX pad has all of these. We’ll lead with what you care about.',
    options: [
      { value: 'comfort', label: 'Comfort', hint: 'Soft top sheet', icon: 'feather' },
      { value: 'protection', label: 'Fewer leaks', hint: 'Leak-management design', icon: 'shield' },
      { value: 'fit', label: 'Stays in place', hint: 'Winged design', icon: 'heart' },
      { value: 'value', label: 'Best value', hint: 'Lowest price per pad', icon: 'wallet' },
    ],
  },
  {
    id: 'tried',
    question: 'Have you tried PIAX before?',
    why: 'New to PIAX? A trial lets you feel every size before you commit.',
    options: [
      { value: false, label: 'Not yet', hint: 'I’m new here', icon: 'sparkles' },
      { value: true, label: 'Yes, I have', hint: 'I know what I like', icon: 'check' },
    ],
  },
]

// Pads in size order: luma, vera, nocte, seren.
const order = pads.map((pad) => pad.id)
const bump = (id, steps = 1) => order[Math.min(order.length - 1, order.indexOf(id) + steps)]

// Typical pads per day by flow when changing every few hours; one of them is the overnight pad.
const padsPerDay = [3, 4, 5, 6]

const reasonsFor = {
  flow: ['a lighter flow', 'a regular flow', 'a heavier flow', 'a very heavy flow'],
  priority: {
    comfort: 'A soft top sheet for a comfortable feel',
    protection: '8-layer construction with a leak-management design',
    fit: 'Wings that fold around your underwear to stay in place',
    value: 'We picked the 30-pad Value Pack, the lowest price per pad',
  },
}

// Smallest pack that covers `count` pads, or enough of the largest pack. Trial packs are for trying, not a cycle's supply;
// with `value`, the largest pack is always used for its lower price per pad.
function packFor(pad, count, value = false) {
  const sorted = [...pad.packs].filter((pack) => pack.format !== 'trial').sort((a, b) => a.count - b.count)
  if (value) {
    const largest = sorted[sorted.length - 1]
    return { pack: largest, quantity: Math.ceil(count / largest.count) }
  }
  const fits = sorted.find((pack) => pack.count >= count)
  if (fits) return { pack: fits, quantity: 1 }
  const largest = sorted[sorted.length - 1]
  return { pack: largest, quantity: Math.ceil(count / largest.count) }
}

export function recommend(answers) {
  const { flow, night, change, days, priority, tried } = answers

  let day = order[flow]
  if (change === 'rarely') day = bump(day)

  let nightPad = null
  if (night !== 'none') {
    if (night === 'often') nightPad = bump(day, 2)
    else if (night === 'sometimes') nightPad = bump(day)
    // No leaks: the day pad at night, or the overnight pad once flow is regular or heavier.
    else nightPad = flow >= 1 && order.indexOf(day) < order.indexOf('nocte') ? 'nocte' : day
    // Heavier flow or regular night leaks: at least the overnight pad.
    if ((flow >= 2 || night === 'often') && order.indexOf(nightPad) < order.indexOf('nocte')) nightPad = 'nocte'
  }

  const perDay = padsPerDay[flow]
  const nightCount = nightPad ? days : 0
  const dayCount = days * perDay - nightCount
  const total = dayCount + nightCount

  // Combine counts when day and night use the same pad.
  const needs = {}
  needs[day] = (needs[day] ?? 0) + dayCount
  if (nightPad) needs[nightPad] = (needs[nightPad] ?? 0) + nightCount
  const kit = Object.entries(needs).map(([id, count]) => ({ pad: padById[id], count, ...packFor(padById[id], count, priority === 'value') }))
  const kitPrice = kit.reduce((sum, item) => sum + item.pack.price * item.quantity, 0)
  // Packs come in fixed sizes, so a kit often covers more than one cycle.
  const cycles = Math.max(1, Math.floor(Math.min(...kit.map((item) => (item.pack.count * item.quantity) / item.count))))

  // New to PIAX: suggest the 4-pad Trial Pack of the day pad first, so the size can be tried before a full pack.
  const trialPack = padById[day].packs.find((pack) => pack.format === 'trial')
  const trial = !tried && trialPack
    ? { pad: padById[day], pack: trialPack, why: `New to PIAX? Try ${padById[day].name.replace('PIAX ', '')} in a ${trialPack.count}-pad Trial Pack for ₹${trialPack.price} before you buy a full pack.` }
    : null

  const dayReasons = [
    `Made for ${reasonsFor.flow[flow]}`,
    change === 'rarely' ? 'A size up, to cover you between changes' : `${padById[day].lengthLabel} keeps you covered through the day`,
    reasonsFor.priority[priority],
  ]
  const nightReasons = nightPad && [
    `${padById[nightPad].lengthLabel} of length for extra back coverage`,
    night === 'often' ? 'Our longest cover for leak-free nights' : 'Stays put while you sleep',
    reasonsFor.priority[priority],
  ]

  return { day: padById[day], night: nightPad && padById[nightPad], dayReasons, nightReasons, dayCount, nightCount, total, kit, kitPrice, cycles, trial }
}
