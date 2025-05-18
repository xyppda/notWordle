package cache

import "github.com/redis/go-redis/v9"

type Cache struct {
	Game
	Words
}

type Game interface {
	GetGuesses(gameId string) ([]string, error)
	GetAttempts(gameId string) (int, error)
	IncrAttempts(gameId string) (int64, error)
	NewGuess(gameId, guess string) error
}

type Words interface {
	GetRandomWord() (string, error)
	CheckExistence(word string) (bool, error)
}

func NewCache(redis *redis.Client) *Cache {
	return &Cache{
		Game:  newGameCache(redis),
		Words: newWordsCache(redis),
	}
}
