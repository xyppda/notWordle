package main

import (
	"context"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/spf13/viper"
	"net/http"
	"notWordleApi/internal/cache"
	"notWordleApi/internal/handler"
	"notWordleApi/internal/repository"
	"notWordleApi/internal/service"
	"os"
)

func main() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")

	if err := viper.ReadInConfig(); err != nil {
		panic(fmt.Errorf("fatal error config file: %w", err))
	}

	pgConfig := repository.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetInt("db.port"),
		User:     viper.GetString("db.user"),
		Password: os.Getenv("POSTGRES_PASSWORD"),
		DBName:   viper.GetString("db.dbname"),
	}

	postgres, err := repository.ConnectPostgres(pgConfig)
	if err != nil {
		panic(fmt.Errorf("postgres connection error: %w", err))
	}

	redisConfig := cache.Config{
		Addr:     viper.GetString("redis.addr"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       viper.GetInt("redis.db"),
	}

	redisClient := cache.InitRedis(redisConfig)
	if _, err := redisClient.Ping(context.Background()).Result(); err != nil {
		panic(fmt.Errorf("redis connection error: %w", err))
	}

	repo := repository.NewRepository(postgres)
	caches := cache.NewCache(redisClient)
	services := service.NewService(*repo, *caches)
	handlers := handler.NewHandlers(*services)

	router := handlers.InitRoutes()
	server := &http.Server{
		Addr:    viper.GetString("server.port"),
		Handler: router,
	}

	fmt.Printf("Server starting on %s\n", server.Addr)
	if err := server.ListenAndServe(); err != nil {
		panic(fmt.Errorf("failed to start server: %w", err))
	}
}
