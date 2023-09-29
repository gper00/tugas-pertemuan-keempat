<template>
  <div class="py-4">
    <div class="container">
      <div
        class="title border-bottom d-flex align-items-center justify-content-between py-2"
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
              class="btn btn-light dropdown-toggle py-1 px-3 ms-3"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ selectedCategory ? capitalize(selectedCategory) : "All" }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#" @click="selectedCategory = ''"
                  >All</a
                >2
              </li>
              <li v-for="(category, i) in categories" :key="i">
                <a
                  class="dropdown-item"
                  href="#"
                  @click="selectedCategory = category"
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
      <div class="list-task row px-3">
        <CardItem
          v-for="(task, i) in filterTask"
          :key="i"
          :task="task"
          :isGrid="isGrid"
        />
      </div>
      <div class="action py-2 mt-2">
        <button
          class="btn btn-primary add-button"
          v-if="!isCreating"
          @click="isCreating = !isCreating"
        >
          New Task
        </button>
        <div class="add-card mt-2 border p-lg-3 rounded" v-else>
          <form v-on:submit.prevent="appendTask">
            <div class="card border-0 mb-2">
              <div class="card-title">
                <h5 class="fs-6">Add New Task</h5>
              </div>
              <div class="card-body row justify-content-center p-0">
                <div class="col-lg-6">
                  <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input
                      type="text"
                      :class="[
                        'form-control',
                        formValidation.title ? 'is-invalid' : '',
                      ]"
                      id="title"
                      v-model="form.title"
                    />
                    <div class="invalid-feedback">
                      {{ formValidation.title }}
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select
                      :class="[
                        'form-select',
                        formValidation.category ? 'is-invalid' : '',
                      ]"
                      id="category"
                      v-model="form.category"
                    >
                      <option
                        v-for="(category, i) in categories"
                        :key="i"
                        :value="category"
                      >
                        {{ capitalize(category) }}
                      </option>
                    </select>
                    <div class="invalid-feedback">
                      {{ formValidation.category }}
                    </div>
                    <div class="row align-items-center mt-2">
                      <label
                        for="newCategory"
                        class="col-sm-6 col-form-label text-end"
                      >
                        <small>New Category :</small>
                      </label>
                      <div class="col-sm-6">
                        <input
                          type="text"
                          :class="[
                            'form-control form-control-sm',
                            formValidation.category ? 'is-invalid' : '',
                          ]"
                          id="newCategory"
                          v-model="form.newCategory"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label"
                      >Description</label
                    >
                    <textarea
                      :class="[
                        'form-control',
                        formValidation.description ? 'is-invalid' : '',
                      ]"
                      rows="4"
                      id="description"
                      v-model="form.description"
                    ></textarea>
                    <div class="invalid-feedback">
                      {{ formValidation.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="button-wrapper row justify-content-center">
              <div class="col-lg-6">
                <button class="btn btn-primary me-2" type="submit">Save</button>
                <button
                  class="btn btn-outline-secondary"
                  @click="
                    [
                      (isCreating = !isCreating),
                      (formValidation.title = ''),
                      (formValidation.category = ''),
                      (formValidation.description = ''),
                    ]
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/Card/CardItem.vue";

export default {
  layout(_) {
    return "custom";
  },

  components: {
    CardItem,
  },

  data() {
    return {
      tasks: [
        {
          title: "Hello Taskist",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ducimus? Aut, reiciendis consectetur exercitationem nesciunt sunt perferendis ratione ab expedita?",
          category: "tips",
          isDone: false,
        },
        {
          title: "Ini judul task 2",
          description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sit asperiores vel omnis eum expedita amet itaque, debitis quidem inventore totam consequuntur cupiditate eveniet numquam est.",
          category: "berita",
          isDone: false,
        },
        {
          title: "Ini judul task ke-III",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti fuga perferendis quo molestiae aperiam soluta labore, sint unde ipsa in!",
          category: "tips",
          isDone: false,
        },
        {
          title: "Judul task keempat",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, vitae nihil quas quisquam quae laudantium consequuntur mollitia voluptatem culpa autem, impedit tempore in facilis!",
          category: "berita",
          isDone: false,
        },
        {
          title: "Ini Contoh Judul Task ke-5",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ducimus? Aut, reiciendis consectetur exercitationem nesciunt sunt perferendis ratione ab expedita?",
          category: "berita",
          isDone: false,
        },
      ],
      isCreating: false,
      isGrid: false,
      searchQuery: "",
      selectedCategory: "",

      form: {
        title: "",
        description: "",
        category: "",
      },

      formValidation: {
        title: "",
        description: "",
        category: "",
      },
    };
  },

  computed: {
    filterTask() {
      return this.tasks.filter((task) => {
        if (task.category === this.selectedCategory || !this.selectedCategory) {
          return this.searchQuery
            .toLowerCase()
            .split("")
            .every((v) => task.title.toLowerCase().includes(v));
        }

        return false;
      });
    },

    // get all categories
    categories() {
      return [...new Set(this.tasks.map((item) => item.category))];
    },
  },

  methods: {
    capitalize(str) {
      if (str.includes(" ")) {
        return str
          .split(" ")
          .map((x) =>
            x
              .split("")
              .map((x, i) => (i < 1 ? x.toUpperCase() : x.toLowerCase()))
              .join("")
          )
          .join(" ");
      }

      return str
        .split("")
        .map((x, i) => (i < 1 ? x.toUpperCase() : x.toLowerCase()))
        .join("");
    },

    appendTask() {
      let { title, category, newCategory, description } = this.form;

      if (!category) {
        if (newCategory) {
          category = newCategory;
        }
      }

      const validation = this.validate(title, category, description);

      if (!validation.isValidated) {
        this.formValidation = validation;
        return;
      }

      try {
        this.tasks.push({
          title,
          category,
          description,
        });
      } catch (err) {
        console.log(err.message);
      }

      this.resetVModel();
      this.resetFilter();
      this.formValidation.title = "";
      this.formValidation.category = "";
      this.formValidation.description = "";
      return;
    },

    resetVModel() {
      this.isCreating = !this.isCreating;
      this.form.title = "";
      this.form.category = "";
      this.form.newCategory = "";
      this.form.description = "";
    },

    resetFilter() {
      this.selectedCategory = "";
      this.searchQuery = "";
    },

    validate(title, category, description) {
      const validation = {};

      if (!title) {
        validation.title = "Title is required.";
      } else if (title.length < 5) {
        validation.title = "Title should not less than 5 characters.";
      } else if (title.length > 100) {
        validation.title = "Title should not more than 100 characters.";
      }

      if (!category) {
        validation.category = "Category is required.";
      } else if (category.length < 3) {
        validation.category = "Category should not less than 3 characters.";
      } else if (category.length > 20) {
        validation.category = "Category should not more than 20 characters.";
      }

      if (!description) {
        validation.description = "Description is required.";
      } else if (description.length < 15) {
        validation.description =
          "Description should not less than 15 characters.";
      }

      validation.isValidated =
        validation.title || validation.category || validation.description
          ? false
          : true;

      return validation;
    },
  },
};
</script>
