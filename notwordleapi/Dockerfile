FROM golang:1.24-alpine AS builder
WORKDIR /app
RUN go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
COPY --from=builder /go/bin/migrate /usr/local/bin/migrate
COPY config/config.yml ./config/config.yml
COPY data/ /app/data/
COPY migrations/ /app/migrations/
COPY init_redis.sh .

RUN apk add --no-cache postgresql-client redis curl
RUN chmod +x init_redis.sh

EXPOSE 8000

CMD sh -c "./init_redis.sh && migrate -path /app/migrations -database postgres://postgres:123@postgres:5432/notwordle?sslmode=disable up && ./main"