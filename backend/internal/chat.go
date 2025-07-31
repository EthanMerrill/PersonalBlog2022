package internal

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
)

type ChatRequest struct {
	Message string `json:"message"`
}

type ChatResponse struct {
	Response string `json:"response,omitempty"`
	Error    string `json:"error,omitempty"`
}

type ChatConfig struct {
	OpenAIKey string
}

type ChatService struct {
	Config *ChatConfig
}

func NewChatService(openAIKey string) *ChatService {
	return &ChatService{Config: &ChatConfig{OpenAIKey: openAIKey}}
}

// ChatHandler handles chat requests and proxies to OpenAI
func (s *ChatService) ChatHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("/api/chat called from %s", r.RemoteAddr)

	if s.Config.OpenAIKey == "" {
		log.Printf("OpenAI API key not configured")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChatResponse{Error: "OpenAI API key not configured"})
		return
	}

	var req ChatRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Invalid chat request body: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChatResponse{Error: "Invalid request body"})
		return
	}

	// Import work history context
	importedPrompt := WorkHistoryPrompt + "\n\nYou are Ethan's AI assistant on his portfolio website. Be helpful, professional, and represent Ethan well. Keep responses concise and engaging. Reference the work history above if relevant."

	openaiReq := map[string]interface{}{
		"model": "gpt-3.5-turbo",
		"messages": []map[string]string{
			{"role": "system", "content": importedPrompt},
			{"role": "user", "content": req.Message},
		},
		"max_tokens":  150,
		"temperature": 0.7,
	}

	openaiBody, err := json.Marshal(openaiReq)
	if err != nil {
		log.Printf("Failed to marshal OpenAI request: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChatResponse{Error: "Failed to prepare OpenAI request"})
		return
	}

	client := &http.Client{Timeout: 30 * time.Second}
	openaiRequest, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", strings.NewReader(string(openaiBody)))
	if err != nil {
		log.Printf("Failed to create OpenAI request: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChatResponse{Error: "Failed to create OpenAI request"})
		return
	}
	openaiRequest.Header.Set("Content-Type", "application/json")
	openaiRequest.Header.Set("Authorization", "Bearer "+s.Config.OpenAIKey)

	openaiResp, err := client.Do(openaiRequest)
	if err != nil {
		log.Printf("OpenAI API request failed: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChatResponse{Error: "Failed to contact OpenAI API"})
		return
	}
	defer openaiResp.Body.Close()

	if openaiResp.StatusCode != 200 {
		log.Printf("OpenAI API returned status: %d", openaiResp.StatusCode)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadGateway)
		json.NewEncoder(w).Encode(ChatResponse{Error: "OpenAI API error"})
		return
	}

	var openaiResult map[string]interface{}
	if err := json.NewDecoder(openaiResp.Body).Decode(&openaiResult); err != nil {
		log.Printf("Failed to decode OpenAI response: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChatResponse{Error: "Failed to decode OpenAI response"})
		return
	}

	var aiResponse string
	if choices, ok := openaiResult["choices"].([]interface{}); ok && len(choices) > 0 {
		if choice, ok := choices[0].(map[string]interface{}); ok {
			if msg, ok := choice["message"].(map[string]interface{}); ok {
				if content, ok := msg["content"].(string); ok {
					aiResponse = content
				}
			}
		}
	}
	if aiResponse == "" {
		log.Printf("OpenAI response missing content")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChatResponse{Error: "No response from OpenAI"})
		return
	}

	log.Printf("OpenAI chat response sent")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ChatResponse{Response: aiResponse})
}
