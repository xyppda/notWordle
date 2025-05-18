package cache

import (
	"context"
	"github.com/redis/go-redis/v9"
)

type WordsCache struct {
	redis *redis.Client
}

func (w *WordsCache) GetRandomWord() (string, error) {
	ctx := context.Background()
	var word string
	word, err := w.redis.SRandMember(ctx, "wordlist").Result()
	if err != nil {
		return "", err
	}
	return word, nil
}

func (w *WordsCache) CheckExistence(word string) (bool, error) {
	var exist bool
	ctx := context.Background()
	exist, err := w.redis.SIsMember(ctx, "dict", word).Result()
	if err != nil {
		return false, err
	}
	return exist, nil

}

func newWordsCache(redis *redis.Client) *WordsCache {
	return &WordsCache{
		redis: redis,
	}
}
