import { Message } from '../types'
import { SYSTEM_PROMPT } from './chapters'

export async function callClaude(messages: Message[], apiKey: string): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.choices[0].message.content as string
}
