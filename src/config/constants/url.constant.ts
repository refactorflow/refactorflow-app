export const URL = {
  HOME: '/',
  LOGIN: '/login',

  CHALLENGES: '/challenges',
  CHALLENGE: (slug: string) => `/challenges/${slug}`,
  CHALLENGE_HUB: (slug: string) => `/challenges/${slug}/hub`,
  CHALLENGE_SOLUTIONS: (slug: string) => `/challenges/${slug}/solutions`,
  CHALLENGE_NEW_SOLUTION: (slug: string) => `/challenges/${slug}/solutions/new`,

  DASHBOARD: '/dashboard',
  DASHBOARD_CHALLENGES: '/dashboard/challenges',
  DASHBOARD_CREATE_CHALLENGE: '/dashboard/challenges/create-challenge',
};
