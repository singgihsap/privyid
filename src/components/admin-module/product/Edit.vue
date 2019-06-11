<template>
  <div>
    <!-- start:header -->
    <Navbar/>
    <!-- end:/header -->

    <div class="content">
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-sm-6">
            <form v-on:submit.prevent="create">
              <div class="form-group">
                <label>Nama Product</label>
                <input v-model="name" type="text" class="form-control" placeholder="Nama Product">
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea v-model="description" rows="4" class="form-control" placeholder="Description"></textarea>
              </div>
              <div class="form-group">
                <label>Ingredient</label>
                <input v-model="ingredient" type="text" class="form-control" placeholder="ingredient">
              </div>
              <div class="form-group">
                <label>Measurement</label>
                <input v-model="measurement" type="text" class="form-control" placeholder="measurement">
              </div>
              <div class="form-group margin-bottom-2">
                <label>Size Number (Cm)</label>
                <input v-model="size_value" type="number" class="form-control" placeholder="cm">
              </div>
              <button type="submit" class="btn btn-dark btn-sm float-right">Update Product</button>
              <router-link :to="{ name: 'product' }" class="btn btn-light btn-sm float-right margin-right-1">Cancel</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { instanceProductApi } from './../../../api'

  export default {
    name: 'product-edit',
    data: function() {
      return {
        productId: this.$route.params.id,
        name: '',
        description: '',
        ingredient: '',
        measurement: '',
        categoryId: '',
        size_value: '',
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
          this.name = val.data.product.name;
        };
        instanceProductApi.detail({ id: this.productId }, successCb);
      },
      create() {
        const successCb = () => {
          this.$swal({
            type: 'info',
            // title: 'Sorry...',
            text: 'Product Creation Successful'
          }).then(() => {
            return this.$router.push({ name: 'product' });
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
            description: this.description,
            ingredient: this.ingredient,
            measurement: this.measurement,
            product_category_id: this.categoryId,
            size: 'cm',
            size_value: this.size_value
          }
        };

        instanceProductApi.create(payload, successCb, validationCb);
      }
    }
  }
</script>