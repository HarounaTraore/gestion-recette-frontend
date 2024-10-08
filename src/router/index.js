import { createRouter, createWebHistory } from "vue-router";

import Home from "@/components/Home.vue";
import ListeRecettes from "@/components/ListeRecettes.vue";
import AjouterRecette from "@/components/AjouterRecette.vue";
import ModifierRecette from "@/components/ModifierRecette.vue";
import ListeCategorie from "@/components/categories/ListeCategorie.vue";
import ModifierCategorie from "@/components/categories/ModifierCategorie.vue";
import AjouterCateorie from "@/components/categories/AjouterCateorie.vue";
import ListeRecetteCategorie from "@/components/categories/ListeRecetteCategorie.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/Liste",
      component: ListeRecettes,
    },
    {
      path: "/ajouter",
      component: AjouterRecette,
    },
    {
      path: "/modifier",
      component: ModifierRecette,
    },

    {
      path: "/categories",
      component: ListeCategorie,
      name: "categories",
    },
    {
      path: "/categories/add",
      component: AjouterCateorie,
      name: "add-categorie",
    },
    {
      path: "/categories/:id",
      component: ModifierCategorie,
      name: "edit-categorie",
    },
    {
      path: "/categories/:id/recettes",
      component: ListeRecetteCategorie,
      name: "list-recettes-categorie",
    },
  ],
});

export default router;
