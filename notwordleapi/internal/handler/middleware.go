package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h *Handler) validateGameId() gin.HandlerFunc {
	return func(c *gin.Context) {
		gameId := c.Param("id")
		exist, err := h.services.Game.CheckExistence(gameId)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if !exist {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "game does not exist"})
			return
		}
		c.Next()
	}
}
