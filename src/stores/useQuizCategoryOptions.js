import { defineStore } from "pinia";

export const useQuizCategoryOptions = defineStore("quizCategoryOptions", {
  state: () => {
    return {
      categories: [
        { id: null, name: "Any Category" },
        { id: 9, name: "General Knowledge" },
        { id: 10, name: "Books" },
        { id: 11, name: "Film" },
        { id: 12, name: "Music" },
        { id: 13, name: "Musicals & Theatres" },
        { id: 14, name: "Television" },
        { id: 15, name: "Video Games" },
        { id: 16, name: "Board Games" },
        { id: 17, name: "Science & Nature" },
        { id: 18, name: "Computers" },
        { id: 19, name: "Mathematics" },
        { id: 20, name: "Mythology" },
        { id: 21, name: "Sports" },
        { id: 22, name: "Geography" },
        { id: 23, name: "History" },
        { id: 24, name: "Politics" },
        { id: 25, name: "Art" },
        { id: 26, name: "Celebrities" },
        { id: 27, name: "Animals" },
        { id: 28, name: "Vehicles" },
        { id: 29, name: "Comics" },
        { id: 30, name: "Gadgets" },
        { id: 31, name: "Japanese Anime & Manga" },
        { id: 32, name: "Cartoon & Animations" },
      ],
      difficulties: [
        { id: null, name: "Any Difficulty" },
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
      ],
      categoryValue: null,
      categoryName: null,
      difficultyValue: null,
      questionsArray: null,
      showHighScores: false,
      userScores: [],
    };
  },
});
