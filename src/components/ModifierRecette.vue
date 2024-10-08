<template>
  <div v-if="recette">
    <h3 class="text-center fw-bold mt-4 mb-4">
      {{ $t("recette.editRecipe") }}
    </h3>
    <div class="row">
      <div class="">
        <router-link to="/Liste" class="btn btn-secondary mb-3">
          <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>
      <div class="col-md-6">
        <form @submit.prevent="modifierRecette">
          <div class="mb-3 position-relative">
            <label for="titre" class="form-label">{{
              $t("recette.recipeTitle")
            }}</label>
            <div class="input-group">
              <span class="input-group-text bg-success text-white border-end-0">
                <i class="fas fa-utensils"></i>
              </span>
              <input type="text" id="titre" v-model="recette.titre" class="form-control border-success"
                :placeholder="$t('recette.recipeTitlePlaceholder')" required />
            </div>
            <small v-if="errors.titre" class="text-danger">{{ errors.titre }}</small>
          </div>

          <div class="mb-3 position-relative">
            <label for="ingredient" class="form-label">{{
              $t("recette.ingredients")
            }}</label>
            <div class="input-group">
              <span class="input-group-text bg-success text-white border-end-0">
                <i class="fas fa-apple-alt"></i>
              </span>
              <textarea id="ingredient" v-model="recette.ingredients" class="form-control border-success"
                :placeholder="$t('recette.recipeIngredientsPlaceholder')" required></textarea>
            </div>
            <small v-if="errors.ingredients" class="text-danger">{{ errors.ingredients }}</small>
          </div>

          <div class="mb-3 position-relative">
            <label for="type" class="form-label">{{
              $t("recette.recipeType")
            }}</label>
            <div class="input-group">
              <span class="input-group-text bg-success text-white border-end-0">
                <i class="fas fa-drumstick-bite"></i>
              </span>
              <select id="type" v-model="recette.type" class="form-control border-success" required>
                <option value="Entrée">{{ $t("recette.starter") }}</option>
                <option value="Plat">{{ $t("recette.mainCourse") }}</option>
                <option value="Dessert">{{ $t("recette.dessert") }}</option>
              </select>
            </div>
          </div>
          <div class="mb-3 position-relative">
            <label for="categorie" class="form-label">{{
              $t("recette.selectCategory")
            }}</label>
            <div class="input-group">
              <span class="input-group-text bg-success text-white border-end-0">
                <i class="fas fa-drumstick-bite"></i>
              </span>
              <select id="categorie" v-model="recette.categorie_id" class="form-control border-success" required>
                <option value="" disabled>
                  {{ $t("recette.selectCategory") }}
                </option>
                <option v-for="(categorie, index) in store.categories" :key="index" :value="categorie.id">
                  {{ categorie.nom }}
                </option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-success w-25">
            {{ $t("recette.save") }}
          </button>
        </form>
      </div>

      <div class="col-md-6 d-flex justify-content-center align-items-center d-none d-md-block">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/img1.jpg" class="d-block w-100" alt="Image 1" />
            </div>
            <div class="carousel-item">
              <img src="../assets/img2.jpg" class="d-block w-100" alt="Image 2" />
            </div>
            <div class="carousel-item">
              <img src="../assets/img3.jpg" class="d-block w-100" alt="Image 3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRecetteStore } from "@/stores/recette";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { t } = useI18n();
const store = useRecetteStore();
const recette = store.recette;

const errors = reactive({
  titre: null,
  ingredients: null,
});

const validateForm = () => {
  let isValid = true;

  if (recette.titre.length < 5 || recette.titre.length > 100) {
    errors.titre = t("recette.titleError");
    isValid = false;
  } else {
    errors.titre = null;
  }

  if (recette.ingredients.length < 10 || recette.ingredients.length > 500) {
    errors.ingredients = t("recette.ingredientsError");
    isValid = false;
  } else {
    errors.ingredients = null;
  }

  return isValid;
};

const modifierRecette = () => {
  if (validateForm()) {
    const recetteExistante = store.recettes.find(
      (r) => r.titre.toLowerCase() === recette.titre.toLowerCase()
    );

    if (recetteExistante) {
      errors.titre = t("recette.recipeExistsError");
      return;
    }
    store.editRecette();
    router.push("/Liste");
  }
};

onMounted(() => {
  store.loandCategorieData();
  store.loandRecetteData();
});
</script>
