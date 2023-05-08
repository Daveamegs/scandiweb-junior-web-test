<template>
    <div class="card" v-for="apiData in this.products" :key="apiData.id">
        <input type="checkbox" class="delete-checkbox" :checked="isSelected(apiData.id)" @click="handleSelection(apiData.id)">
        <div class="product-details">
            <h5>{{apiData.SKU}}</h5>
            <h5>{{ apiData.product_name }}</h5>
            <h5>{{apiData.price}}</h5>
            <h5 v-if="apiData.size">Size: {{apiData.size}} MB</h5>
            <h5 v-if="apiData.weight">Weight: {{apiData.weight}} KG</h5>
            <h5 v-if="apiData.height">Dimension: {{apiData.height}}x{{ apiData.width }}x{{ apiData.length }}</h5>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';



export default {
    name: "ProductCard",

    methods : {
        ...mapMutations(["setSelectedProducts", "removeSelectedProducts"]),

        handleSelection(productID){
            if(this.isSelected(productID)){
                this.removeSelectedProducts(productID);
            }else{
                this.setSelectedProducts(productID);
            }
        }
    },

    computed : {
        ...mapState(["products", "selectedProducts"]),
        ...mapGetters(["isSelected"])
    },

    created(){
        this.$store.dispatch("getAllProducts");
    }

}
</script>

<style scoped lang="scss">
    .card{
        width: 250px;
        height: 250px;
        border: 1px solid #222;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // overflow: scroll;

        .delete-checkbox{
            position: absolute;
            top: 20px;
            left: 15px;
        }

        .product-details{
            width: 220px;
            line-height: 0.2em;
            background-color: aqua;
        }
    }

</style>