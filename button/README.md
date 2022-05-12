
```
curl -d '{"user_id": 1, "button_id":"gpio6", "value":"pushed"}' \
-H "Content-Type: application/json" \
-X POST http://localhost:3000/button/push
```
