package repository

import (
	"github.com/jmoiron/sqlx"
	"notWordleApi"
)

type Repository struct {
	Game
}

type Game interface {
	Create(gameType, word string) (string, error)
	GetInfo(gameId string) (notwordleapi.GameInfo, error)
	GetWord(gameId string) (string, error)
	CheckExistence(gameId string) (bool, error)
	UpdateStatus(gameId string, status string) error
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Game: newGameRepository(db),
	}
}
