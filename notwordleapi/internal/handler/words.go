package handler

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type checkInput struct {
	Word string `json:"word"`
}

func (h *Handler) checkExistence(c *gin.Context) {
	var input checkInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	exists, err := h.services.Words.CheckExistence(input.Word)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"exists": exists})
}
