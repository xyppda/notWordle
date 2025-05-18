package handler

import (
	"github.com/gin-gonic/gin"
	"notWordleApi/internal/service"
)

type Handler struct {
	services service.Service
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.Default()
	{
		api := router.Group("/api")
		{
			api.GET("ping", h.pingApi)
			games := api.Group("/games")
			games.POST("", h.createGame)
			game := games.Group("/:id", h.validateGameId())
			{
				game.GET("", h.getGameInfo)
				game.POST("/guess", h.guessWord)
				game.GET("/attempts", h.getAttempts)
				game.GET("/guesses", h.getGuesses)
			}
		}
		{
			words := api.Group("/words")
			words.GET("/exists", h.checkExistence)
		}
	}
	return router
}

func (h *Handler) pingApi(c *gin.Context) {
	c.JSON(200, gin.H{"message": "pong"})
}

func NewHandlers(services service.Service) *Handler {
	return &Handler{
		services: services,
	}
}
