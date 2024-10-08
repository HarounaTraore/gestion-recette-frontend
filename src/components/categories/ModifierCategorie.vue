<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="col-12 col-md-6">
      <h3 class="text-center fw-bold mb-4 mt-4">
        {{ $t("editCategory.title") }}
      </h3>
      <div class="">
        <router-link to="/categories" class="btn btn-secondary mb-3">
          <i class="fas fa-arrow-left"></i>
        </router-link>
      </div>
      <form @submit.prevent="updateCategory">
        <div class="mb-3">
          <label for="categoryName" class="form-label">
            {{ $t("editCategory.name") }}
          </label>
          <div class="input-group">
            <span
              class="input-group-text bg-success border-success text-white border-end-0"
            >
              <i class="fas fa-list"></i>
            </span>
            <input
              v-model="stores.categorie.nom"
              type="text"
              id="categoryName"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-success">
            {{ $t("editCategory.save") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRecetteStore } from "@/stores/recette";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const stores = useRecetteStore();

const route = useRoute();
const router = useRouter();

const loadCategory = () => {
  const id = route.params.id;
  const category = stores.categories.find((cat) => cat.id === parseInt(id));
  if (category) {
    stores.categorie = { ...category };
  } else {
    console.error("Category not found");
  }
};

const updateCategory = () => {
  const id = route.params.id;
  stores.editCategorie(id);
  router.push("/categories");
};

onMounted(() => {
  stores.loandCategorieData();
  loadCategory();
});
</script>
