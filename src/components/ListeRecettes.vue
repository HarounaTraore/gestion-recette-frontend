<template>
  <div class="container mt-5">
    <h2 class="text-center mb-2 fw-bold">{{ t("recette.listTitle") }}</h2>


    <div class="container mb-3 d-flex justify-content-between">

      <div class=" w-75 mt-4">
        <div class="input-group w-50">
          <span class="input-group-text bg-primary border-primary">
            <i class="fas fa-search"></i>
          </span>
          <input type="text w-50" class="form-control border-primary rounded"
            :placeholder="$t('recette.searchPlaceholder')" v-model="searchQuery" />
        </div>
      </div>
      <RouterLink class="btn btn-primary mt-3 mb-3" to="/ajouter" @click="store.iniatilise">
        {{ t("recette.addRecipe") }}
      </RouterLink>
    </div>
    <table class="table table-hover">
      <thead class="table-success">
        <tr>
          <th>{{ "N°" }}</th>
          <th>{{ t("recette.recipeTitle") }}</th>
          <th>{{ t("recette.recipeType") }}</th>
          <th class="text-center">{{ t("recette.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <!-- Utiliser la fonction calculée filteredRecettes -->
        <tr v-for="recette in filteredRecettes" :key="recette.id">
          <td>{{ recette.id }}</td>
          <td>{{ recette.titre }}</td>
          <td>{{ recette.type }}</td>
          <td class="text-center">
            <button class="btn btn-info btn-sm me-2" @click="viewRecette(recette)" data-bs-toggle="modal"
              data-bs-target="#voirRecetteModal">
              <i class="fas fa-eye"></i>
            </button>
            <RouterLink to="/modifier" class="btn btn-warning btn-sm me-2" @click="store.getRecette(recette)">
              <i class="fas fa-edit"></i>
            </RouterLink>
            <button class="btn btn-danger btn-sm" @click="removeRecette(recette.id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="voirRecetteModal" tabindex="-1" aria-labelledby="voirRecetteModalTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="voirRecetteModalTitle">
              {{ t("recette.recipeDetails") }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>N°:</strong> {{ store.recette.id }}</p>
            <p>
              <strong>{{ t("recette.recipeTitle") }}:</strong>
              {{ store.recette.titre }}
            </p>
            <p>
              <strong>{{ t("recette.ingredients") }}:</strong>
              {{ store.recette.ingredients }}
            </p>
            <p>
              <strong>{{ t("recette.recipeType") }}:</strong>
              {{ store.recette.type }}
            </p>
            <p v-if="store.categorie">
              <strong>{{ t("recette.recipeCategory") }}:</strong>
              {{ store.categorie[0].nom }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecetteStore } from "@/stores/recette";
import { onMounted, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

const store = useRecetteStore();
const searchQuery = ref("");

const recettes = computed(() => store.recettes);
const { t } = useI18n();

const filteredRecettes = computed(() => {
  return recettes.value.filter((recette) =>
    recette.titre.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

onMounted(() => {
  store.loandRecetteData();
  store.loandCategorieData();
});

const viewRecette = (recette) => {
  store.getRecette(recette);
};

const removeRecette = (id) => {
  const confirme = confirm(t("recette.recipeConfirm"));
  if (confirme) {
    store.removeRecette(id);
  }
};
</script>

<style scoped></style>
