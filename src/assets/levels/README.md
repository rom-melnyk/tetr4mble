# Tetr4mble level

The levels are stored in a [JSON file](./levels.json):

```json
[
   {
      "description": "A level",
      "level": [
         "   ###",
         "   ###",
         "######",
         "######"
      ]
   },
   {/* another level */}
]
```

In order to get the initial level setup, a [textures](./textures.json) is applied to the level.
Consider:
```
Texture       Generated
              level

                 #@@
  AABB           @##
  BBAA        @@##@@
              ##@@##
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
   - An octothorp `#` stands for a cell of some type (will be defined by a texture and visualized appropriately).
1. The playfield is normalized upon loading: the empty rows and columns are removed. So following two produce similar levels:
   ```json
   [{
     "level": [
       "##",
       "##"
     ]
   }, {
     "level": [
       "  ##",
       "  ##  ",
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
