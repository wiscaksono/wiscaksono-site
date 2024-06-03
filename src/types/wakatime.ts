export interface WeeklyCodingActivity {
  data: {
    grand_total: GrandTotal
    range: Range
  }[]
}

export interface WeeklyCodingLanguanges {
  data: {
    name: string
    percent: number
    color: string
  }[]
}

export interface WeeklyCodeEditor {
  data: {
    color: string
    name: string
    percent: number
  }[]
}

export interface WeeklyOperatingSystems {
  data: {
    color: string
    name: string
    percent: number
  }[]
}

export interface Daum {
  grand_total: GrandTotal
  range: Range
}

export interface GrandTotal {
  decimal: string
  digital: string
  hours: number
  minutes: number
  text: string
  total_seconds: number
}

export interface Range {
  date: string
  end: string
  start: string
  text: string
  timezone: string
}
