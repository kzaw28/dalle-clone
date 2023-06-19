import { surpriseMePrompts } from '../constants'

export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpirseMePrompts.length);
    const randomPrompt = surpirseMePrompts[randomIndex];

    // To make sure we don't get the same prompt twice in a row
    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }

    return randomPrompt;
}