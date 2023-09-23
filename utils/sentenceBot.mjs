const subjects = [
    "The cat",
    "A dog",
    "My friend",
    "The computer",
    "A bird",
    "The teacher",
    "The book",
    "A car",
    "The sun",
    "A flower"
];

const verbs = [
    "jumps",
    "runs",
    "sleeps",
    "eats",
    "laughs",
    "reads",
    "drives",
    "flies",
    "learns",
    "watches"
];

const adjectives = [
    "happy",
    "quick",
    "beautiful",
    "smart",
    "tall",
    "funny",
    "colorful",
    "friendly",
    "exciting",
    "peaceful"
];

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export default function generateRandomSentence() {
    return `${getRandomElement(subjects)} ${getRandomElement(verbs)} ${getRandomElement(adjectives)}.`
}