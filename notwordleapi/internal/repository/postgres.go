package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
)

const (
	gamesTable = "games"
)

type Config struct {
	Host     string
	Port     int
	DBName   string
	User     string
	Password string
}

func ConnectPostgres(cfg Config) (*sqlx.DB, error) {
	db, err := sqlx.Connect("postgres", fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		cfg.Host, cfg.Port, cfg.DBName, cfg.User, cfg.Password))
	if err != nil {
		return nil, err
	}
	return db, nil
}
