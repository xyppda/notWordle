package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type CreateGameInput struct {
	GameType string `json:"type" binding:"required"`
}

type guessInput struct {
	Word string `json:"word" binding:"required"`
}

func (h *Handler) createGame(c *gin.Context) {
	var input CreateGameInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	word, err := h.services.Words.GetRandomWord()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	gameId, err := h.services.Create(input.GameType, word)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": gameId})
}

func (h *Handler) guessWord(c *gin.Context) {
	var input guessInput
	gameId := c.Param("id")
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	exists, err := h.services.Words.CheckExistence(input.Word)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if !exists {
		c.JSON(http.StatusNotFound, gin.H{"error": "word not found"})
		return
	}
	guess, err := h.services.GuessWord(gameId, input.Word)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, guess)
}

func (h *Handler) getAttempts(c *gin.Context) {
	gameId := c.Param("id")
	attempts, err := h.services.GetAttempts(gameId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"attempts": attempts})

}

func (h *Handler) getGuesses(c *gin.Context) {
	gameId := c.Param("id")
	guesses, err := h.services.GetGuesses(gameId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"guesses": guesses})
}

func (h *Handler) getGameInfo(c *gin.Context) {
	gameId := c.Param("id")
	info, err := h.services.GetInfo(gameId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, info)
}
