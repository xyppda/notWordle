package cache

import "github.com/redis/go-redis/v9"

type Config struct {
	Addr     string
	Password string
	DB       int
}

func InitRedis(cfg Config) *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.Addr,
		Password: cfg.Password,
		DB:       cfg.DB,
	})
	return client
}
