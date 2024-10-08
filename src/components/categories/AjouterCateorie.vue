<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="col-12 col-md-6">
      <h3 class="text-center fw-bold mb-4 mt-4">
        {{ $t("addCategorie.title") }}
      </h3>
      <div class="">
        <router-link to="/categories" class="btn btn-secondary mb-3">
          <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>
      <form @submit.prevent="addCategory">
        <div class="mb-3">
          <label for="categoryName" class="form-label">
            {{ $t("addCategorie.name") }}
          </label>
          <div class="input-group">
            <span
              class="input-group-text bg-success border-success text-white border-end-0"
            >
              <i class="fas fa-list"></i>
            </span>
            <input
              v-model="categorie.nom"
              type="text"
              id="categoryName"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-success">
            {{ $t("addCategorie.submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { useRecetteStore } from "@/stores/recette";
import { ref } from "vue";

const stores = useRecetteStore();

const categorie = ref({ nom: "" });

const addCategory = () => {
  stores.addCategorie({ nom: categorie.value.nom });
  categorie.value.nom = "";

  router.push("/categories");
};
</script>
