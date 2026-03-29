# Tetr4mble levels

The level maps are stored in a [JSON file](./levels.json):

```json
[
   {
      "name": "A level",
      "map": [
         "######",
         "######",
         "   ###",
         "   ###"
      ]
   },
   {/* another level */}
]
```

There are [textures](./textures.json) denoting possible cell distribution over the map:

```json
[
   {
      "difficulty": 1,
      "texture": [
         "AABB",
         "BBAA"
      ]
   },
   {/* another texture */}
]
```

In order to get the initial level setup, the level map is tiled with the texture:

```
 Level       Texture       Generated
  map                        level
------------------------------------
######                      ○○▨▨○○
######        AABB          ▨▨○○▨▨
   ###        BBAA             ▨○○
   ###                         ○▨▨
```

The level will will be shuffled upon game start 🙂


# Notes and Limitations

## Levels

1. The `levels.json` and `texture.json` shoud respect aforementioned structure.
1. A level string contains spaces ` ` and `#`.
   - A spaces ` ` stands for and empty non-playable cell.
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
1. ❗ The level map  **must be valid:** the 2⨯2 cursor should be able to reach _any playable cell_ from _any other playable cell_ ❗
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


## Textures

1. The texture is a rectangular shape (an array of strings of same length).
1. The texture should contain max 6 elements: `A` → `F`.
1. There's no predefined mapping between texture letters and cell types.
   The mapping is picked randomly upon level start.
   The texture
   ```
   [
      "AB",
      "BA"
   ]
   ```
   means that there will be 2 cell types used in this order.
1. Textures are associated with the difficulty.
   So when user selects a level `L` at difficuly `D`, the game picks a random texture of that difficulty and applies it to the level map.
