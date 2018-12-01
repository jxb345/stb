# stb

This is a (primitive) version of the game, Shut The Box.

The goal of the game:
- "flip down" all "tiles", which are numbered 1 - 9

For each turn:
- roll the dice
- select number(s) from the remaining tiles that add up to the dice roll
- IMP NOTE: when entering more than 1 number, separate each number with a single space (otherwise, the game will (currently) break)

The game ends if:
- you cannot sum the dice roll with your remaining tiles
- all tiles have been flipped down
