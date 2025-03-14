// Обчислює факторіал числа
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Обчислює біноміальний коефіцієнт C(n,k)
function binomialCoefficient(n, k) {
    // Оптимізація для великих чисел і уникнення переповнення
    if (k > n - k) {
        k = n - k;
    }
    
    let result = 1;
    for (let i = 0; i < k; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    
    return result;
}

// Обчислює ймовірність вгадати точно k питань з n при заданих варіантах відповідей
function calculateExactProbability(optionsPerQuestion, k) {
    const n = optionsPerQuestion.length;
    
    // Усі можливі комбінації вибору k питань з n
    const combinations = [];
    
    // Рекурсивна функція для генерації всіх комбінацій вибору k індексів з n
    function generateCombinations(start, currentCombination) {
        if (currentCombination.length === k) {
            combinations.push([...currentCombination]);
            return;
        }
        
        for (let i = start; i < n; i++) {
            currentCombination.push(i);
            generateCombinations(i + 1, currentCombination);
            currentCombination.pop();
        }
    }
    
    generateCombinations(0, []);
    
    // Обчислення сумарної ймовірності для всіх комбінацій
    let totalProbability = 0;
    
    for (const combo of combinations) {
        let probability = 1;
        
        // Ймовірність вгадати вибрані питання
        for (const index of combo) {
            probability *= (1 / optionsPerQuestion[index]);
        }
        
        // Ймовірність не вгадати решту питань
        for (let i = 0; i < n; i++) {
            if (!combo.includes(i)) {
                probability *= (1 - 1 / optionsPerQuestion[i]);
            }
        }
        
        totalProbability += probability;
    }
    
    return totalProbability;
}

// Обчислює ймовірність вгадати певний відсоток питань або більше
function calculatePercentageProbability(optionsPerQuestion, percentage, exact = false) { 
    const n = optionsPerQuestion.length;
    const targetCorrect = Math.ceil((percentage / 100) * n);
    let probability = 0;
    
    if (exact) {
        probability = calculateBinomialProbability(optionsPerQuestion, targetCorrect);
    } else {
        for (let k = targetCorrect; k <= n; k++) {
            probability += calculateBinomialProbability(optionsPerQuestion, k);
        }
    }
    
    return probability;
}

// Обчислює ймовірність вгадати рівно k питань з використанням біноміального розподілу
// з урахуванням різної кількості варіантів для кожного питання
function calculateBinomialProbability(optionsPerQuestion, k) {
    const n = optionsPerQuestion.length;
    
    // Для невеликої кількості питань можемо використовувати точний метод
    if (n <= 20) {
        return calculateExactProbability(optionsPerQuestion, k);
    }
    
    // Для великої кількості питань використовуємо апроксимацію
    // Обчислюємо середню ймовірність успіху для одного питання
    const avgP = optionsPerQuestion.reduce((sum, options) => sum + (1 / options), 0) / n;
    
    // Використовуємо біноміальний розподіл з середньою ймовірністю
    return binomialCoefficient(n, k) * Math.pow(avgP, k) * Math.pow(1 - avgP, n - k);
}

function calculateChances(data) {  
    return [
            calculatePercentageProbability(data, 100, true),
            calculatePercentageProbability(data, 75, true),
            calculatePercentageProbability(data, 50, true),
            calculatePercentageProbability(data, 25, true)
        ]
}