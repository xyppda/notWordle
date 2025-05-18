package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"notWordleApi"
)

type GamePostgres struct {
	db *sqlx.DB
}

func (g *GamePostgres) Create(gameType, word string) (string, error) {
	var id string
	query := fmt.Sprintf("INSERT INTO %s (type, word) VALUES ($1, $2) RETURNING id", gamesTable)
	row := g.db.QueryRow(query, gameType, word)
	err := row.Scan(&id)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (g *GamePostgres) GetInfo(gameId string) (notwordleapi.GameInfo, error) {
	var info notwordleapi.GameInfo
	query := fmt.Sprintf("SELECT id, status, type, word FROM %s WHERE id = $1", gamesTable)
	err := g.db.QueryRow(query, gameId).Scan(&info.Id, &info.Status, &info.Type, &info.Word)
	if err != nil {
		return notwordleapi.GameInfo{}, err
	}
	return info, nil
}

func (g *GamePostgres) CheckExistence(gameId string) (bool, error) {
	var exists bool
	query := fmt.Sprintf("SELECT EXISTS (SELECT 1 FROM %s WHERE id=$1)", gamesTable)
	err := g.db.QueryRow(query, gameId).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (g *GamePostgres) GetWord(gameId string) (string, error) {
	var word string
	query := fmt.Sprintf("SELECT word FROM %s WHERE id = $1", gamesTable)
	err := g.db.QueryRow(query, gameId).Scan(&word)
	if err != nil {
		return "", err
	}
	return word, nil

}

func (g *GamePostgres) UpdateStatus(gameId string, status string) error {
	query := fmt.Sprintf("UPDATE %s SET status = $1 WHERE id = $2", gamesTable)
	_, err := g.db.Exec(query, status, gameId)
	if err != nil {
		return err
	}
	return nil
}

func newGameRepository(db *sqlx.DB) *GamePostgres {
	return &GamePostgres{
		db: db,
	}
}
