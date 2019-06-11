<template>
  <div>
    <!-- start:header -->
    <Navbar/>
    <!-- end:/header -->

    <div class="content">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-sm-12">
            <div class="d-flex margin-bottom-2">
              <h4 class="mr-auto align-self-center margin-bottom-0">List Category</h4>
              <router-link :to="{ name: 'category-create' }" class="btn btn-dark btn-sm">Add Category</router-link>
            </div>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
                <th scope="col" width="150"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in category.data" :key="item.id">
                <th scope="row">{{ item.name }}</th>
                <td>{{ item.created_at }}</td>
                <td>{{ item.updated_at }}</td>
                <td>
                  <router-link
                    :to="{ name: 'category-edit', params: { id: item.id } }"
                    class="btn btn-outline-info btn-sm margin-right-1"
                    v-b-tooltip.hover
                    title="Edit"
                  >
                    edit
                  </router-link>
                  <button class="btn btn-outline-danger btn-sm">delete</button>
                </td>
              </tr>
              </tbody>
            </table>

            <!-- start: pagination -->
            <Pagination
              :page="page"
              :goto-page="gotoPage"
              :total-rows="allProduct.meta.pagination"
              :limit="allProduct.meta.pagination.per_page"
            ></Pagination>
            <!-- end:/ pagination -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'category',
    data: function() {
      return {
        allProduct: {
          data: [],
          meta: {
            pagination: {
              per_page: 10
            }
          }
        },
      }
    },
    computed: {
      ...mapState('category', {
        category: state => state.category
      })
    },
    watch: {
      product: function(val) {
        this.allProduct.data = val.data;
        this.allProduct.meta.pagination = val.meta;
      }
    },
    created: function() {
      this.getCategory();
    },
    methods: {
      getCategory: function(page = this.page, limit = this.limit) {
        this.page = page;
        this.limit = limit;
        this.$store.dispatch('category/getAll', {
          params: {}
        });
      },
      gotoPage: function(page, limit) {
        this.getCategory(page, limit);
      }
    }
  }
</script>