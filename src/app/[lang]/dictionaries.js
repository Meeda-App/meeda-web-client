"use server";

// Dictionary import functions for supported locales
const dictionaries = {
    "en-US": () =>
        import("@/data/dictionaries/it.json").then((module) => module.default),
    "it-IT": () =>
        import("@/data/dictionaries/it.json").then((module) => module.default),
};

// Async function to get the dictionary for a given locale
export const getDictionary = async (locale) => dictionaries[locale]();
