package service

import "notWordleApi/internal/cache"

type WordsService struct {
	cache cache.Words
}

func (w *WordsService) GetRandomWord() (string, error) {
	return w.cache.GetRandomWord()
}

func (w *WordsService) CheckExistence(word string) (bool, error) {
	return w.cache.CheckExistence(word)
}

func newWordsService(cache cache.Words) *WordsService {
	return &WordsService{
		cache: cache,
	}
}
