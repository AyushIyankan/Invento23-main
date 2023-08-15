import { eventCategories, eventTypes } from './api/schema'

export const BACKGROUNDS = {
    clrDarkTeal: 'hsla(203, 48%, 10%, 1)',
    clrDarkPurple: `hsl(266 12% 12% / 1)`,
    GradientDarkPurple:
        'linear-gradient(180deg, rgba(29, 26, 33, 0) -90%, #1d1a21 15.94%, #1d1a21 100%)',
    GradientDarkTeal: 'linear-gradient(180deg, rgba(13, 28, 37, 0) -90%, #0D1C25 20.72%)',
    clrDarkRed: `#ba2548`,
    clrDarkBlue: '#1c419c',
    clrWhite: `#fff`,
    clrDarkRed600: 'hsl(346, 98%, 17%)',
    clrDark: 'hsl(202, 92%, 5%)',
}

export const API_URI = import.meta.env.VITE_API_BASE_URL

export const titleMap = {
    [eventTypes[0]]: 'Pro Show',
    [eventTypes[1]]: 'Tech Fest',
    [eventTypes[2]]: 'Saptha',
    [eventTypes[3]]: 'Taksati',
    [eventCategories[0]]: 'Workshops',
    [eventCategories[1]]: 'Competitions',
    [eventCategories[2]]: 'Exhibitions',
    [eventCategories[3]]: 'Pre Events',
    [eventCategories[4]]: 'General Events',
    [eventCategories[5]]: 'Spotlight',
    [eventCategories[6]]: 'Group',
    [eventCategories[7]]: 'Solo',
    [eventCategories[8]]: 'Expo',
}
