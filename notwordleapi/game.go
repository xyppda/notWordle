package notwordleapi

type GameInfo struct {
	Id     string `json:"id" db:"id"`
	Status string `json:"status" db:"status"`
	Type   string `json:"type" db:"type"`
	Word   string `json:"word" db:"word"`
}
