// Генетичні алгоритми - це евристичні алгоритми пошуку, натхненні процесом, який підтримує еволюцію життя.
// Алгоритм призначений для відтворення процесу природного відбору, який забезпечує покоління, тобто виживання
// найбільш пристосованих істот. Стандартні генетичні алгоритми поділяються на п'ять етапів, а саме:

// 1. Створення початкової популяції.
// 2. Розрахунок придатності.
// 3. Відбір найкращих генів.
// 4. Схрещування.
// 5. Мутація для введення варіаці

class City {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  distanceTo(city) {
    const dx = this.x - city.x
    const dy = this.y - city.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class TSPGeneticAlgorithm {
  constructor(numCities, populationSize, mutationRate) {
    this.numCities = numCities
    this.populationSize = populationSize
    this.mutationRate = mutationRate
    this.cities = []
    this.population = []
    this.fitness = []
  }

  initialize() {
    // створюємо массив міст та координати для кожного
    for (let i = 0; i < this.numCities; i++) {
      this.cities.push(new City(Math.random() * 200, Math.random() * 200))
    }

    // створення популяції
    for (let i = 0; i < this.populationSize; i++) {
      // тур - рандомно розставлені міста в массиві
      const tour = this.shuffleArray([...Array(this.numCities).keys()])
      this.population.push(tour)
    }
  }

  evolve() {
    const newPopulation = []
    for (let i = 0; i < this.populationSize; i++) {
      // обераємо найрезультатніших батьків
      const parent1 = this.selectParent()
      const parent2 = this.selectParent()
      // отримуємо дитя зхрещуючи "генетичні стрічки" батьків
      const child = this.crossover(parent1, parent2)
      // мутація генів
      this.mutate(child)
      newPopulation.push(child)
    }
    this.population = newPopulation
  }

  selectParent() {
    // рандомно беремо 5 турів на калькулюємо найкращий
    const tournamentSize = 5
    let bestTour = null
    for (let i = 0; i < tournamentSize; i++) {
      // обераємо рандомний тур
      const randomIndex = Math.floor(Math.random() * this.populationSize)
      const tour = this.population[randomIndex]
      if (
        bestTour === null ||
        this.calculateTourDistance(tour) < this.calculateTourDistance(bestTour)
      ) {
        bestTour = tour
      }
    }
    return bestTour
  }

  crossover(parent1, parent2) {
    // обераємо початок та кінець "генового ланцюжка"
    const start = Math.floor(Math.random() * this.numCities)
    // "(this.numCities - start)" щоб не вийти за границі массиву
    const end = Math.floor(Math.random() * (this.numCities - start)) + start
    const child = parent1.slice(start, end) // отримуємо ланцюжок у першого батька

    // заповнюємо остачу ланцюжка генами другого батька
    for (let city of parent2) {
      // якщо міста немає в массив...
      if (!child.includes(city)) {
        child.push(city) // ...то додаємо
      }
    }
    return child
  }

  mutate(tour) {
    for (let i = 0; i < this.numCities; i++) {
      if (Math.random() < this.mutationRate) {
        // заміна двох рандомних міст
        const index1 = Math.floor(Math.random() * this.numCities)
        const index2 = (index1 + 1) % this.numCities
        ;[tour[index1], tour[index2]] = [tour[index2], tour[index1]]
      }
    }
  }

  calculateTourDistance(tour) {
    let distance = 0
    for (let i = 0; i < this.numCities; i++) {
      const fromCity = this.cities[tour[i]] // місто і
      const toCity = this.cities[tour[(i + 1) % this.numCities]] // місто і+1
      distance += fromCity.distanceTo(toCity) // калькулюємо дистанція між ними
    }
    return distance
  }

  // фунція тасування елементів массиву популяції, (нові елементи не додаються)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  findBestTour() {
    let bestTour = this.population[0]
    let bestDistance = this.calculateTourDistance(bestTour)
    for (let tour of this.population) {
      const distance = this.calculateTourDistance(tour)
      if (distance < bestDistance) {
        bestDistance = distance
        bestTour = tour
      }
    }
    return bestTour
  }

  calculateFitness() {
    this.fitness = []
    for (let i = 0; i < this.populationSize; i++) {
      const tour = this.population[i]
      const distance = this.calculateTourDistance(tour)
      const fitness = distance
      this.fitness.push(fitness)
    }
  }
}

const numCities = 5
const populationSize = 100
const mutationRate = 0.01

const tspGA = new TSPGeneticAlgorithm(numCities, populationSize, mutationRate)
tspGA.initialize()

for (let generation = 0; generation < 1000; generation++) {
  tspGA.calculateFitness()
  tspGA.evolve()
}

const bestTour = tspGA.findBestTour()
console.log('Кращий шлях:', bestTour)
console.log('Краща дистанція:', tspGA.calculateTourDistance(bestTour))
console.log(tspGA.fitness)
