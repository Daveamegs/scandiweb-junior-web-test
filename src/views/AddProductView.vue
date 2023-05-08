<template>
  <div class="add-product">
    <Header productAddText="Product Add" saveBtnText="Save" cancelBtnText="Cancel" />
    <hr>
    <div>
      <AddProduct />
    </div>
  </div>
</template>

<script>
import AddProduct from "@/components/AddProduct.vue";
import Header from "@/components/Header.vue";

export default {
  name: "AddProductView",
  components: {
    AddProduct,
    Header
  },

}

</script>

<style scoped lang="scss">
.add-product{

  #header{
    display: flex;
    justify-content: space-between;

    .btn-div{
        

        .btn-save{
            margin-right: 20px;
        }
    }
}
  

}

</style>