import { mockApi } from './mockApi'

export const aiService = {
  askQuestion: (query) => mockApi.getAiResponse(query),
}
