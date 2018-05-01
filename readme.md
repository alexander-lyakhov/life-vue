### [demo](https://alexander-lyakhov.github.io/life-vue/)
# Conway's Game of Life

The [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules), also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

### _Rules_

The universe of the Game of Life is an infinite two-dimensional orthogonal grid of square "cells", each of which is in one of two possible states, alive or dead, (or "populated" and "unpopulated" respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed-births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations.

---
# Игра <Жизнь>

[Игра <Жизнь>](https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB) (англ. Conway's Game of Life) - клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году.

### _Правила_
- Место действия этой игры - <вселенная> - это размеченная на клетки поверхность или плоскость - безграничная, ограниченная, или замкнутая (в пределе - бесконечная плоскость).
- Каждая клетка на этой поверхности может находиться в двух состояниях: быть <живой> (заполненной) или быть <мёртвой> (пустой). Клетка имеет восемь соседей, окружающих её.
- Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:
    - в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
    - если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае, если соседей меньше двух или больше трёх, клетка умирает (<от одиночества> или <от перенаселённости>)

- Игра прекращается, если
    - на поле не останется ни одной <живой> клетки
    - конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
    - при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)

Эти простые правила приводят к огромному разнообразию форм, которые могут возникнуть в игре.
Игрок не принимает прямого участия в игре, а лишь расставляет или генерирует начальную конфигурацию «живых» клеток, которые затем взаимодействуют согласно правилам уже без его участия (он является наблюдателем).