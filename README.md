# VIRTUAL CONTROL FRONTEND TEST

## Install and start the server

```
$ npm install
$ npm run dev
```

You need to create a simple counter application that can do the following:
[x] Add a named counter to a list of counters 
[x] Increment any of the counters
[x] Decrement any of the counters
[x] Delete a counter
[x] Show a sum of all the counter values
[x] It must persist data back to the server

A possible layout could be:
```
         Counter App
+-----------------------------+
| Input                   [+] |
+-----------------------------+
+-----------------------------+
| [x] Bob           [-] 5 [+] |
| [x] Steve         [-] 1 [+] |
| [x] Pat           [-] 4 [+] |
+-----------------------------+
+-----------------------------+
| Total                    10 |
+-----------------------------+
```

## API endpoints / examples

> The following endpoints are expecting a `Content-Type: application/json`

```
GET /api/v1/counters
# []

POST {title: "bob"} /api/v1/counter
# [
#   {id: "asdf", title: "bob", count: 0}
# ]

POST {title: "steve"} /api/v1/counter
# [
#   {id: "asdf", title: "bob", count: 0},
#   {id: "qwer", title: "steve", count: 0}
# ]

POST {id: "asdf"} /api/v1/counter/inc
# [
#   {id: "asdf", title: "bob", count: 1},
#   {id: "qwer", title: "steve", count: 0}
# ]

POST {id: "qwer"} /api/v1/counter/dec
# [
#   {id: "asdf", title: "bob", count: 1},
#   {id: "qwer", title: "steve", count: -1}
# ]

DELETE {id: "qwer"} /api/v1/counter
# [
#   {id: "asdf", title: "bob", count: 1}
# ]

GET /api/v1/counters
# [
#   {id: "asdf", title: "bob", count: 1},
# ]
```

> **NOTE:* Each request returns the current state of all counters.
