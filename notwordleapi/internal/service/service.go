package service

import (
	"notWordleApi"
	"notWordleApi/internal/cache"
	"notWordleApi/internal/repository"
)

type Service struct {
	Game
	Words
}

type Game interface {
	Create(gameType, word string) (string, error)
	GetInfo(gameId string) (notwordleapi.GameInfo, error)
	GetGuesses(gameId string) ([]string, error)
	GetAttempts(gameId string) (int, error)
	GuessWord(gameId, word string) (GuessResult, error)
	CheckExistence(gameId string) (bool, error)
}

type Words interface {
	GetRandomWord() (string, error)
	CheckExistence(word string) (bool, error)
}

func NewService(repo repository.Repository, cache cache.Cache) *Service {
	return &Service{
		Game:  newGameService(repo.Game, cache.Game),
		Words: newWordsService(cache.Words),
	}
}
