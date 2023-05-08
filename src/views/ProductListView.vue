<template>
  <div class="home">
    <Header productListText="Product List" addBtnText="ADD" deleteBtnText="Mass Delete" />
    <hr>
    <div class="home-list">
    <ProductCard />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '@/components/ProductCard.vue';
import Header from "@/components/Header.vue";
import { mapActions } from 'vuex';

export default {
  name: 'ProductListView',
  components: {
    ProductCard,
    Header
  },

  methods: {
    ...mapActions(["getAllProducts"])
  },

  beforeRouteEnter(to, from, next){
    next(vm => {
      vm.getAllProducts()
    })
  }

}
</script>

<style scoped lang="scss">
.home{

  #header{
    display: flex;
    justify-content: space-between;

    .btn-div{
      .btn-add{
      margin-right: 20px;
          
      }
    }
}

  .home-list{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 25px;
  }
}

@media screen and (max-width: 600px)  {
  .home-list{
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }        
        
}

@media screen and (min-width: 601px) and (max-width: 978px)  {
  .home-list{
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    text-align: center;
  }
        
}

@media screen and (min-width: 979px) and (max-width: 1200px)  {
  .home-list{
    display: grid !important;
    grid-template-columns: 1fr 1fr 1fr !important;
    text-align: center;
  }
        
}
</style>