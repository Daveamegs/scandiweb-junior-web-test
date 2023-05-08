<template>
    <header id="header">
        <h2 
            class="header-title" 
            v-if="productAddText"
        >
            {{ productAddText }}
        </h2>
        <h2 
            class="header-title" 
            v-if="productListText"
        >
            {{ productListText }}
        </h2>


        <div 
            class="btn-div " 
            v-if="addBtnText && deleteBtnText"
        >
            <router-link to="/add-product">
                <button class="add-btn">{{ addBtnText }}</button>
            </router-link>
            <button class="delete-btn" @click="deleteProducts">{{ deleteBtnText }}</button>
        </div>

        <div class="btn-div " v-if="saveBtnText && cancelBtnText">
            <button 
                class="save-btn" 
                @click="addProduct" 
                type="submit"
            >
                {{ saveBtnText }}
            </button>
            <router-link to="/">
                <button 
                    class="cancel-btn" 
                    @click="cancel"
                    >
                    {{ cancelBtnText }}
                </button>
            </router-link>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: "HeaderVue",

    props: {
        productListText: String,
        productAddText: String,
        addBtnText: String,
        saveBtnText: String,
        deleteBtnText: String,
        cancelBtnText: String
    },

    methods: {
        addProduct(){
            const hasErrors = this.validateForm()

            if (!hasErrors){
                this.$store.dispatch("addProduct", this.formData);
            }
            
        },

        deleteProducts(){
            this.$store.dispatch("deleteProducts", this.selectedProducts)
        },

        cancel(){
            this.$store.dispatch("cancel");
        },

        validateSKU(newSKU){
            return this.products.find(product => product.SKU == newSKU)
        },

        validateForm(){
            const errors = {}

            if (this.validateSKU(this.formData.SKU)){
                 errors.duplicateSKU = "Product SKU already exist, provide another one";
             }

            if(!this.formData.SKU){
                errors.SKU = "SKU field is required";
            }

            if (!this.formData.name){
                errors.name = "Name field is required";
            }

            if (!this.formData.price){
                errors.price = "Price field is required";
            }

            if (!this.formData.productType){
                errors.productType = "Select a product type";
            }

            if (this.formData.productType == "DVD" && !this.formData.size){
                errors.size = "Size field is required";
            } 
            
            if (this.formData.productType == "book" && !this.formData.weight){
                errors.weight = "Weight field is required";
            } 
            
            if (this.formData.productType == "furniture" && !this.formData.height){
                errors.height = "Height field is required"; 
            }

            if (this.formData.productType == "furniture" && !this.formData.width){
                errors.width = "Width field is required"; 
            }

            if (this.formData.productType == "furniture" && !this.formData.length){
                errors.length = "Length field is required"; 
            }

            this.$store.dispatch("setErrors", errors);

            return Object.values(errors).some((error) => error)

        },

    },

    computed: {
        formData(){
            return this.$store.state.formData;
        },

        ...mapState(["products"]),

    }

}



</script>

<style scoped lang="scss">
#header{
    display: flex;
    justify-content: space-between;


    button{
        appearance: none;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 1px 2px #ccc;
        cursor: pointer;
    }
    .btn-div{
        margin: 1.5em 0 ;
        

        .add-btn, .save-btn{
            margin-right: 20px;
            background-color: #28f;

        }

        .delete-btn, .cancel-btn{
            background-color: #f22;
        }
    }
}

</style>