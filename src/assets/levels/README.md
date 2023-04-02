# Tetr4mble level

A level definition is an array of strings wrapped in a JSON:

```json
[
  "   111",
  "   111",
  "222333",
  "222333"
]
```

produces a level like this:
```
   ###
   ###
>>>@@@
>>>@@@
```

## JSON structure and peculiarities

1. The JSON should represent the `string[]`.
2. A spaces `" "` stands for and empty non-playable cell.
3. A number `1..6` stands for a cell of particular type (will be visualized appropriately).
4. The playfield is normalized upon loading: the empty rows and columns are removed.
5. ❗ The field **must be valid:** the 2⨯2 cursor should be able to reach _any playable cell_ from _any other playable cell_ ❗  
   E.g., following fields are invalid:
   ```
             ##          ####
    @        ##          ####
   ###        @@       @@@ ##
   ###        @@       @@@@##
   ```
   The `@`-areas cannot be reached by the 2⨯2 cursor travelling from the `#`-area.