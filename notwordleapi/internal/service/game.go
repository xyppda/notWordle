package service

import (
	"encoding/json"
	"errors"
	"notWordleApi"
	"notWordleApi/internal/cache"
	"notWordleApi/internal/repository"
)

type GameService struct {
	repo  repository.Game
	cache cache.Game
}

type Guess struct {
	Result []int  `json:"result"`
	Word   string `json:"word"`
}

type GuessResult struct {
	Result []int  `json:"result"`
	Status string `json:"status"`
}

func (g *GameService) Create(gameType, word string) (string, error) {
	return g.repo.Create(gameType, word)
}

func (g *GameService) GetInfo(gameId string) (notwordleapi.GameInfo, error) {
	info, err := g.repo.GetInfo(gameId)
	if err != nil {
		return notwordleapi.GameInfo{}, err
	}
	if info.Status == "active" {
		info.Word = ""
	}
	return info, nil
}

func (g *GameService) GuessWord(gameId, word string) (GuessResult, error) {
	var guess Guess
	var guessResult GuessResult
	info, err := g.GetInfo(gameId)
	if err != nil {
		return GuessResult{}, err
	}
	if info.Status != "active" {
		return GuessResult{}, errors.New("game is not active")
	}
	guessResult.Status = "active"
	result := make([]int, 5)
	secretWord, err := g.repo.GetWord(gameId)
	if err != nil {
		return GuessResult{}, err
	}
	r1 := []rune(secretWord)
	charCounter := make(map[rune]int)
	for _, char := range r1 {
		charCounter[char]++
	}
	r2 := []rune(word)
	var correctCounter int
	for i := 0; i < 5; i++ {
		if r1[i] == r2[i] {
			result[i] = 2
			charCounter[r1[i]]--
			correctCounter++
		}
	}
	if correctCounter != 5 {
		for i := 0; i < 5; i++ {
			if result[i] != 2 && charCounter[r2[i]] > 0 {
				result[i] = 1
				charCounter[r2[i]]--
			}
		}
	} else {
		guessResult.Status = "win"
	}
	guessResult.Result = result
	guess.Word = word
	guess.Result = result
	jsonGuess, err := json.Marshal(guess)
	if err != nil {
		return GuessResult{}, err
	}
	err = g.cache.NewGuess(gameId, string(jsonGuess))
	if err != nil {
		return GuessResult{}, err
	}
	attempts, err := g.cache.IncrAttempts(gameId)
	if err != nil {
		return GuessResult{}, err
	}
	if attempts >= 6 && correctCounter != 5 {
		guessResult.Status = "lose"
	}
	if guessResult.Status != "active" {
		err = g.repo.UpdateStatus(gameId, guessResult.Status)
		if err != nil {
			return GuessResult{}, err
		}
	}

	return guessResult, nil
}

func (g *GameService) GetGuesses(gameId string) ([]string, error) {
	return g.cache.GetGuesses(gameId)
}

func (g *GameService) GetAttempts(gameId string) (int, error) {
	return g.cache.GetAttempts(gameId)
}

func (g *GameService) CheckExistence(gameId string) (bool, error) {
	return g.repo.CheckExistence(gameId)
}

func newGameService(repo repository.Game, cache cache.Game) *GameService {
	return &GameService{
		repo:  repo,
		cache: cache,
	}
}
