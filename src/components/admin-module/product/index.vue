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
              <h4 class="mr-auto align-self-center margin-bottom-0">List Product</h4>
              <router-link :to="{ name: 'product-create' }" class="btn btn-dark btn-sm">Add Product</router-link>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Ingredient</th>
                  <th scope="col">Measurement</th>
                  <th scope="col">cm</th>
                  <th scope="col" width="150"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in product.data" :key="item.id">
                  <th scope="row">{{ item.name }}</th>
                  <td>{{ item.description }}</td>
                  <td>{{ item.ingredient }}</td>
                  <td>{{ item.measurement }}</td>
                  <td>{{ item.cm }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'product-edit', params: { id: item.id } }"
                      class="btn btn-outline-info btn-sm margin-right-1"
                      v-b-tooltip.hover
                      title="Edit"
                    >
                      edit
                    </router-link>
                    <button v-on:click="destroy(item.id)" class="btn btn-outline-danger btn-sm">delete</button>
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
  import { instanceProductApi } from './../../../api'
  import { mapState } from 'vuex';

  export default {
    name: 'product',
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
      ...mapState('product', {
        product: state => state.product
      })
    },
    watch: {
      product: function(val) {
        this.allProduct.data = val.data;
        this.allProduct.meta.pagination = val.meta;
      }
    },
    created: function() {
      this.getProducts();
    },
    methods: {
      getProducts: function(page = this.page, limit = this.limit) {
        this.page = page;
        this.limit = limit;
        this.$store.dispatch('product/getAll', {
          params: {}
        });
      },

      gotoPage: function(page, limit) {
        this.getProducts(page, limit);
      },

      destroy: async function(id) {
        this.$swal({
          title: 'Proceed with deletion?',
          text: 'You won\'t be able to revert this!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#693080',
          cancelButtonColor: '#C7BBBB',
          confirmButtonText: 'Yes, delete it!',
        }).then(result => {
          if (result.value) {
            const successCb =
              this.$swal(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              ).then(() => this.getProducts());
            instanceProductApi.delete({id}, successCb);
          }
        });
      }
    }
  }
</script>