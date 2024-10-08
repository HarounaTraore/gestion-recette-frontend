import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useRecetteStore = defineStore("recette", {
  state: () => ({
    route: useRouter(),

    recette: {
      titre: "",
      ingredients: "",
      type: "",
      categorie_id: "",
    },
    categorie: "",
    recetteId: "",
    categorieName: "",

    categories: [],
    recettes: [],
    recettesCategorie: [],
  }),

  actions: {
    async loandRecetteData() {
      try {
        const reponse = await axios.get("http://127.0.0.1:3000/recettes");
        this.recettes = reponse.data;
      } catch (err) {
        console.error("Erreur lors du chargement des recettes :", err.message);
        this.recettes = [];
      }
    },

    async iniatilise() {
      this.recette.titre = "";
      this.recette.ingredients = "";
      this.recette.type = "";
      this.recette.categorie_id = "";
    },
    getRecette(recette) {
      if (recette) {
        this.recette = recette;
        this.categorie = this.categories.filter(
          (cat) => cat.id === recette.categorie_id,
        );
        this.recetteId = recette.id;
      } else {
        this.recette = {
          id: null,
          titre: "",
          ingredient: "",
          type: "",
          categorie_id: null,
        };
      }
    },
    async removeRecette(index) {
      try {
        const reponse = await axios.delete(
          `http://127.0.0.1:3000/recettes/${index}`,
        );
        this.loandRecetteData();
        return reponse;
      } catch (err) {
        console.error(
          "Erreur lors de la suppression de la recette :",
          err.message,
        );
      }
    },
    async addRecette(recette) {
      try {
        await axios.post("http://127.0.0.1:3000/recettes", recette);
        this.loandRecetteData();
      } catch (err) {
        console.error("Erreur lors de l'ajout de la recette :", err.message);
      }
    },

    async editRecette() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:3000/recettes/${this.recetteId}`,
          this.recette,
        );
        console.log(response.data);
        this.loandRecetteData();
      } catch (err) {
        console.error(
          "Erreur lors de la modification de la recette :",
          err.message,
        );
      }
    },
    recetteByCategorie(id) {
      this.recettesCategorie = this.recettes.filter(
        (recette) => recette.categorie_id === id,
      );
    },
    nameCategory(id) {
      this.categorieName = this.categories[id].nom;
    },

    // :::::::::::::::::::::SECTION CATEGORIE::::::::::::::::
    async loandCategorieData() {
      try {
        const reponse = await axios.get("http://127.0.0.1:3000/categories");
        this.categories = reponse.data;
      } catch (err) {
        console.error(
          "Erreur lors du chargement des catégories :",
          err.message,
        );
        this.categories = [];
      }
    },
    getCategorie(categorie) {
      this.categories = categorie;
    },
    async removeCategorie(index) {
      try {
        const reponse = await axios.delete(
          `http://127.0.0.1:3000/categories/${index}`,
        );
        this.loandCategorieData();
        return reponse;
      } catch (err) {
        console.error(
          "Erreur lors de la suppression de la catégorie :",
          err.message,
        );
      }
    },
    async addCategorie(obj) {
      try {
        const reponse = await axios.post(
          `http://127.0.0.1:3000/categories`,
          obj,
        );
        this.loandCategorieData();
        return reponse;
      } catch (err) {
        console.error("Erreur lors de l'ajout de la catégorie :", err.message);
      }
    },
    async editCategorie(index) {
      try {
        await axios.put(
          `http://127.0.0.1:3000/categories/${index}`,
          this.categorie,
        );
        this.loandCategorieData();
        this.route.push("/categories");
      } catch (err) {
        console.error(
          "Erreur lors de la modification de la catégorie :",
          err.message,
        );
      }
    },
  },
});
