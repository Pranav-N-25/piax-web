import { useSyncExternalStore } from 'react'

// Favourite products, remembered in this browser only. Every card shares one store, so a heart
// toggled in one place updates everywhere. Storage can be unavailable (private mode, blocked
// site data); favourites then last for the visit.
const KEY = 'piax-favourites'
const listeners = new Set()
let current = load()

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function save(next) {
  current = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Keep the in-memory list.
  }
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useFavourites() {
  const favourites = useSyncExternalStore(subscribe, () => current, () => current)
  const toggle = (id) => save(favourites.includes(id) ? favourites.filter((item) => item !== id) : [...favourites, id])
  return { favourites, isFavourite: (id) => favourites.includes(id), toggle }
}
