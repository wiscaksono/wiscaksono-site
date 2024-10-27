export function getFileExtension(name: string) {
  return name.split('.').pop()
}

export const debounceFunc = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export const getRandomWidth = (min: number, max: number) => `${Math.floor(Math.random() * (max - min + 1) + min)}%`
