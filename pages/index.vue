<template>
  <div class="py-4">
    <div class="container">
      <div
        class="title border-bottom border-secondary d-flex align-items-center justify-content-between py-2"
      >
        <h5>Tasks</h5>
        <div class="d-flex align-items-center ms-auto">
          <input
            type="text"
            class="form-control py-1 px-3"
            placeholder="Search"
            v-model="searchQuery"
          />
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle py-1 px-3 ms-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedCategory }}
            </button>
            <ul class="dropdown-menu">
              <li v-for="(category, index) in computedCategory" :key="index">
                <a
                  class="dropdown-item"
                  href="#"
                  @click="
                    (function () {
                      selectedCategory = capitalize(category);
                    })()
                  "
                  >{{ capitalize(category) }}</a
                >
              </li>
            </ul>
          </div>
          <div class="d-flex align-items-center justify-content-end w-100">
            <span class="me-2">View As</span>
            <button
              class="btn btn-outline-secondary py-1 px-3"
              @click="isGrid = !isGrid"
            >
              {{ isGrid ? "Grid" : "List" }}
            </button>
          </div>
        </div>
      </div>
      <div class="list-task row">
        <CardItem
          v-for="(task, i) in resultFilter"
          :key="i"
          :task="task"
          :isGrid="isGrid"
        />
      </div>
      <div class="action py-2">
        <a
          href="#"
          class="add-button"
          v-if="!isCreating"
          @click="isCreating = !isCreating"
          >Add New Task</a
        >
        <form v-else class="add-card mt-2" @submit.prevent="appendTask">
          <div class="card border-0 mb-2">
            <div class="card-body d-flex flex-column p-0">
              <input
                type="text"
                class="form-control mb-2"
                placeholder="Title"
                v-model="inputTitle"
                required
              />
              <select
                class="form-control mb-2"
                v-model="inputCategory"
                required
              >
                <option value="">-- Select Category --</option>
                <option
                  v-for="(category, i) in computedCategory"
                  :key="i"
                  :value="category"
                  v-show="i != 0"
                >
                  {{ capitalize(category) }}
                </option>
              </select>
              <textarea
                rows="3"
                class="form-control small"
                placeholder="Description"
                v-model="inputDescription"
                required
              ></textarea>
            </div>
          </div>
          <div class="button-wrapper d-flex">
            <button class="btn btn-primary me-2" type="submit">Save</button>
            <button
              class="btn btn-outline-secondary"
              @click="isCreating = !isCreating"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/Card/CardItem.vue";
// import DropdownItem from "@/components/Dropdown/DropdownItem.vue";

export default {
  layout(_) {
    return "custom";
  },

  components: {
    CardItem,
    // DropdownItem,
  },

  data() {
    return {
      tasks: [
        {
          title: "Ini judul task 1",
          description: "Ini deskripsi task 1",
          category: "Tips",
          isDone: false,
        },
        {
          title: "Ini judul task 2",
          description: "Ini deskripsi task 2",
          category: "Berita",
          isDone: false,
        },
        {
          title: "Ini judul task 3",
          description: "Ini deskripsi task 3",
          category: "Berita",
          isDone: false,
        },
      ],
      isCreating: false,
      isGrid: false,
      searchQuery: "", // penampung teks pencarian
      selectedCategory: "All",

      // new input
      inputTitle: "",
      inputDescription: "",
      inputCategory: "",
    };
  },

  computed: {
    resultFilter() {
      return this.tasks.filter((task) => {
        if (
          task.category === this.selectedCategory ||
          this.selectedCategory === "All"
        ) {
          return this.searchQuery
            .toLowerCase()
            .split("")
            .every((v) => task.title.toLowerCase().includes(v));
        }

        return false;
      });
    },

    computedCategory() {
      const categories = ["all"];
      this.tasks.forEach((task) => {
        const category = task.category.toLowerCase();
        if (categories.indexOf(category) == -1) categories.push(category);
      });

      return categories;
    },

    // categories() {
    //   return [...new Set(this.tasks.map((item) => item.category))];
    // },
  },

  methods: {
    capitalize(sentence) {
      return sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
    },
    // filterCategory(category) {
    //   console.log(category);
    //   return this.tasks.filter((item) => item.category == category);
    // },

    appendTask() {
      try {
        this.tasks.push({
          title: this.inputTitle,
          description: this.inputDescription,
          category: this.inputCategory,
          isDone: false,
        });

        console.log(this.tasks);
      } catch (error) {
        alert("Something wrong!");
      }
      this.resetVModel();
      this.resetFilter();
    },

    resetVModel() {
      this.isCreating = !this.isCreating;
      this.inputTitle = "";
      this.inputDescription = "";
      this.inputCategory = "";
    },

    resetFilter() {
      this.selectedCategory = "All";
      this.searchQuery = "";
    },
  },
};
</script>
