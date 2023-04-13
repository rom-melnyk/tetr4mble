# Tetr4mble level

The levels are stored in a JSON file:

```json
[
   {
      "description": "A level",
      "level": [
         "   111",
         "   111",
         "222333",
         "222333"
      ]
   },
   {/* another level */}
]
```

This provides the initial level setup like this:
```
   ###
   ###
>>>@@@
>>>@@@
```
...which will be shuffled upon game start 🙂

## JSON structure and peculiarities

1. The JSON should use the structure:
   ```ts
   type LevelsJSON = Array<{
     description: string;
     shuffle?: string[];
     level: string[];
   }>
   ```
   The `levels.json` must contain at least one level.
1. A level string contains spaces `" "` and numbers `1..6`.
   - A spaces `" "` stands for and empty non-playable cell.
   - A number `1..6` stands for a cell of particular type (will be visualized appropriately).
1. The playfield is normalized upon loading: the empty rows and columns are removed. So following two produce similar levels:
   ```json
   [{
     "level": [
       "11",
       "11"
     ]
   }, {
     "level": [
       "  11",
       "  11  ",
       "  "
     ]
   }]
   ```
1. ❗ The field **must be valid:** the 2⨯2 cursor should be able to reach _any playable cell_ from _any other playable cell_ ❗  
   E.g., following fields are invalid:
   ```
                    .......          ..........
   .......          : ##  :          :   #### :
   :  @  :          : ##  :          :   #### :
   : ### :          :  @@ :          : @@@ ## :
   : ### :          :  @@ :          : @@@@## :
   :.....:          :.....:          :........:
   ```
   The `@`-areas cannot be reached by the 2⨯2 cursor travelling from the `#`-area.
1. The `shuffle: string[]` is an optional property of the level object. If present, it overrides the default (randomized) shuffle strategy. This is useful for pre-configured levels like the training ones.  
   The `shuffle` as an array of strings (commands) of following structure:
   ```
   "x:y => R"
   ```
   where `x` and `y` stand for the cursor position and `R` defines the amount of rotations (clockwise).  
   E.g.:

   ```
   Initial     Shuffle      Result
                                  
     AB      ["0:0 => 1"]     BA
     BB                       BB
                                  
     AA      ["0:0 => 2",     BB
     BB       "0:1 => 2"]     BB
     BB                       AA
   ```