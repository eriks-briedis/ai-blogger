import { cities } from './cities'
import { countries } from './countries'

const postTitlesByCategory: PostTitleGroups = {
  travel: [
    `Top {{topCount}} Hidden Gems in {{country}}`,
    `Top {{topCount}} Hidden Gems in {{city}}`,
    `Top {{topCount}} Must-See Places in {{country}}`,
    `Top {{topCount}} Must-See Places in {{city}}`,
    `A Food Lover's Guide to {{city}}: Exploring the Culinary Delights`,
    `How to Plan the Perfect Weekend Getaway on a Budget`,
    `The Ultimate Road Trip Playlist: Songs for the Open Road`,
    `Exploring {{city}}'s Local Markets: A Shopper's Paradise`,
    `Healthy and Delicious Recipes from Around the World`,
    `{{topCount}} Unique Experiences to Try in {{country}}`,
    `{{topCount}} Unique Experiences to Try in {{city}}`,
    `The Best Street Food in {{city}}: A Gastronomic Adventure`,
    `How to Travel Sustainably: Tips for Eco-Conscious Explorers`,
    `Unforgettable Hiking Trails in {{country}}: Connecting with Nature`,
    `Exploring {{city}} by Bike: Cycling Adventures for All Levels`,
    `A Guide to the Top Luxury Resorts in {{country}}`,
    `Mastering the Art of Packing: Essential Tips for Travelers`,
    `Exploring {{city}}'s Art Scene: Galleries, Museums, and Street Art`,
    `Traveling with Pets: Tips for a Pawsome Adventure`,
    `The Ultimate Guide to Solo Travel: Embracing Independence`,
    `Food Photography 101: Capturing Mouthwatering Moments`,
    `A Day in the Life of a Local: Immersing Yourself in {{country}}'s Culture`,
    `Hidden Cafés and Coffee Shops: Discovering {{city}}'s Best Brews`,
    `Wellness Retreats: Rejuvenating Mind, Body, and Soul in {{country}}`,
  ],
  // food: [
  //   `{{topCount}} Must-Try Restaurants in {{city}}`,
  //   `{{topCount}} Must-Try Restaurants in {{country}}`,
  //   `{{topCount}} Must-Try Dishes in {{city}}`,
  //   `{{topCount}} Must-Try Dishes in {{country}}`,
  //   `{{topCount}} Must-Try Street Food in {{city}}`,
  //   `{{topCount}} Must-Try Street Food in {{country}}`,
  //   `{{topCount}} Must-Try Desserts in {{city}}`,
  //   `{{topCount}} Must-Try Desserts in {{country}}`,
  //   `{{topCount}} Must-Try Drinks in {{city}}`,
  //   `{{topCount}} Must-Try Drinks in {{country}}`,
  //   `{{topCount}} Must-Try Bakeries in {{city}}`,
  //   `{{topCount}} Must-Try Bakeries in {{country}}`,
  //   `{{topCount}} Must-Try Cafés in {{city}}`,
  //   `{{topCount}} Must-Try Cafés in {{country}}`,
  // ],
  // lifestyle: [
  //   `{{topCount}} Must-Try Activities in {{city}}`,
  //   `{{topCount}} Must-Try Activities in {{country}}`,
  //   `{{topCount}} Must-Try Activities for Families in {{city}}`,
  // ],
}

export const generatePostTitleInCategory = (category: keyof PostTitleGroups) => {
  const titles = postTitlesByCategory[category]
  if (!titles) {
    throw new Error(`No titles found for category: ${category}`)
  }

  const title = titles[Math.floor(Math.random() * titles.length)]

  const regex = /{{(.*?)}}/g
  const matches = title.match(regex)
  const variables = (matches ?? []).map((m) => m.replace(/{{|}}/g, ''))

  return variables.reduce((acc, variable) => {
    let value = ''
    const min = 5
    const max = 10

    switch (variable) {
      case 'topCount':
        value = `${Math.floor(Math.random() * (max - min + 1)) + min}`
        break
      case 'country':
        value = countries[Math.floor(Math.random() * countries.length)]
        break
      case 'city':
        value = cities[Math.floor(Math.random() * cities.length)]
        break
    }

    return value ? acc.replace(`{{${variable}}}`, value) : acc
  }, title)
}

export type PostTitleGroups = Record<string, string[]>
