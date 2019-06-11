<template>
  <div>
    <!-- start:header -->
    <Navbar/>
    <!-- end:/header -->

    <div class="content">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-sm-6">
            <form v-on:submit.prevent="update">
              <div class="form-group margin-bottom-2">
                <label>Nama Category</label>
                <input v-model="name" type="text" class="form-control" placeholder="Nama Category">
              </div>
              <button type="submit" class="btn btn-dark btn-sm float-right">Update Category</button>
              <router-link :to="{ name: 'category' }" class="btn btn-light btn-sm float-right margin-right-1">Cancel</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { instanceCategoryApi } from './../../../api'

  export default {
    name: 'category-edit',
    data: function() {
      return {
        categoryId: this.$route.params.id,
        name: '',
      }
    },
    computed: {},
    watch: {},
    created: function() {
      this.getDetailProducts();
    },
    methods: {
      getDetailProducts: function() {
        const successCb = val => {
          this.name = val.category.data.name;
        };
        instanceCategoryApi.detail({ id: this.categoryId }, successCb);
      },
      update() {
        const successCb = () => {
          this.$swal({
            type: 'info',
            // title: 'Sorry...',
            text: 'Category Update Successful'
          }).then(() => {
            return this.$router.push({ name: 'category' });
          });
        };

        const validationCb = val => {
          if (val.data) {
            Object.keys(this.validation).forEach(key => {
              this.validation[key] = val.data[key] || [];
            });
          } else {
            Object.keys(this.validation).forEach(key => {
              this.validation[key] = [];
            });
          }
        };

        const payload = {
          body: {
            name: this.name,
            enable: true,
          }
        };

        instanceCategoryApi.update(payload, successCb, validationCb);
      }
    }
  }
</script>