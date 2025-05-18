package cache

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
)

type GameCache struct {
	redis *redis.Client
}

func (g *GameCache) GetGuesses(gameId string) ([]string, error) {
	ctx := context.Background()
	var guesses []string
	guesses, err := g.redis.LRange(ctx, fmt.Sprintf("guesses:%s", gameId), 0, -1).Result()
	if err != nil {
		return nil, err
	}
	return guesses, nil
}
func (g *GameCache) GetAttempts(gameId string) (int, error) {
	ctx := context.Background()
	var attempts int
	attempts, err := g.redis.Get(ctx, fmt.Sprintf("attempts:%s", gameId)).Int()
	if err != nil {
		return 0, err
	}
	return attempts, nil
}

func (g *GameCache) IncrAttempts(gameId string) (int64, error) {
	ctx := context.Background()
	return g.redis.Incr(ctx, fmt.Sprintf("attempts:%s", gameId)).Result()
}

func (g *GameCache) NewGuess(gameId, guess string) error {
	ctx := context.Background()
	_, err := g.redis.RPush(ctx, fmt.Sprintf("guesses:%s", gameId), guess).Result()
	return err
}

func newGameCache(redis *redis.Client) *GameCache {
	return &GameCache{
		redis: redis,
	}
}
