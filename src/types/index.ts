export interface Chapter {
  id: number
  num: string
  title: string
  sub: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}
