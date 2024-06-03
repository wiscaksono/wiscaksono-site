export interface UmamiStats {
  pageviews: Pageviews
  visitors: Visitors
  visits: Visits
  bounces: Bounces
  totaltime: Totaltime
}

export interface Pageviews {
  value: number
  change: number
}

export interface Visitors {
  value: number
  change: number
}

export interface Visits {
  value: number
  change: number
}

export interface Bounces {
  value: number
  change: number
}

export interface Totaltime {
  value: number
  change: number
}
