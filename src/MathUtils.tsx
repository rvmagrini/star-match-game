export const mathUtils = { 
    
    sum (arr: number[]): number { 
        return arr.reduce((acc: number, curr: number) => acc + curr, 0) 
    },

    range (min: number, max: number): number[] {
        return Array.from({length: max - min + 1}, (_, i) => min + i)
    },

    random (min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min + 1))
    },

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn (arr: Array<number>, max: number): number {
        const sets: number[][] = [[]];
        const sums: number[] = [];
        for (let i=0; i < arr.length; i++) {
            for (let j=0, len = sets.length; j < len; j++) {
                const candidateSet: Array<number> = sets[j].concat(arr[i]);
                const candidateSum: number = mathUtils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[mathUtils.random(0, sums.length - 1)];
    }
}
