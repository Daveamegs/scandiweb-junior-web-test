<template>
     <form id="product-form">
        <div class="input-div">
            <label for="sku">
                <span>SKU: </span>
                <input 
                    type="text" 
                    name="sku" 
                    id="sku" 
                    v-model="formData.SKU" 
                    placeholder="Please Insert Product SKU"
                    @input="validateForm"
                >
            </label>
            <p v-if="this.errors.SKU" class="error">{{ this.errors.SKU }}</p>
            <p v-if="this.errors.duplicateSKU" class="error">{{ this.errors.duplicateSKU }}</p>
        </div>
        <div class="input-div">
            <label for="name">
                <span>Name: </span>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    v-model="formData.name"
                    placeholder="Please Insert Product Name"
                    @input="validateForm"
                >
            </label>
            <p v-if="this.errors.name" class="error">{{ this.errors.name }}</p>
        </div>
        <div class="input-div">
            <label for="price">
                <span>Price($): </span>
                <input 
                    type="number" 
                    name="price" 
                    id="price" 
                    v-model="formData.price"
                    placeholder="Please Insert Product Price"
                    @input="validateForm"
                >
            </label>
            <p v-if="this.errors.price" class="error">{{ this.errors.price }}</p>
        </div>
        <div class="input-div">
            <label for="productType">
                <span>Product Type: </span>
                <select 
                    name="productType" 
                    id="productType" 
                    v-model="formData.productType" 
                    @change="validateForm"
                >
                    <option value="" selected>--Please Select Product Type--</option>
                    <option value="DVD" id="DVD">DVD</option>
                    <option value="furniture" id="Furniture">Furniture</option>
                    <option value="book" id="Book">Book</option>
                </select>
            </label>
            <p v-if="this.errors.productType" class="error">{{ this.errors.productType }}</p>
        </div>
        <div v-if="formData.productType == 'DVD'">
            <div class="input-div">
                <label for="size">
                    <span>Size(MB): </span>
                    <input 
                        type="number"
                        name="size"
                        id="size"
                        v-model="formData.size" 
                        required 
                        placeholder="Please Insert DVD Size"
                        @input="validateForm"
                    >
                </label>
                <p v-if="this.errors.size" class="error">{{ this.errors.size }}</p>
                <span class="product-desc">Please, provide size in MB</span>
            </div>
        </div>
        <div v-if="formData.productType == 'furniture'">
            <div class="input-div">
                <label for="height">
                    <span>Height(CM): </span>
                    <input 
                        type="number" 
                        name="height" 
                        id="height" 
                        v-model="formData.height" 
                        required 
                        placeholder="Please Insert Furniture Height"
                        @input="validateForm"
                    >
                </label>
                <p v-if="this.errors.height" class="error">{{ this.errors.height }}</p>
            </div>
            <div class="input-div">
                <label for="width">
                    <span>Width(CM): </span>
                    <input 
                        type="number" 
                        name="width" 
                        id="width" 
                        v-model="formData.width" 
                        required 
                        placeholder="Please Insert Furniture Width"
                        @input="validateForm"
                    >
                </label>
                <p v-if="this.errors.width" class="error">{{ this.errors.width }}</p>
            </div>
            <div class="input-div">
                <label for="length">
                    <span>Length(CM): </span>
                    <input 
                        type="number" 
                        name="length" 
                        id="length" 
                        v-model="formData.length" 
                        required 
                        placeholder="Please Insert Furniture Length"
                        @input="validateForm"
                    >
                </label>
                <p v-if="this.errors.length" class="error">{{ this.errors.length }}</p>
            </div>
            <span class="product-desc">Please, provide dimensions in HxWxL format</span>
        </div>
        <div v-if="formData.productType == 'book'">
            <div class="input-div">
                <label for="weight">
                    <span>Weight(KG): </span>
                    <input 
                        type="number" 
                        name="weight" 
                        id="weight" 
                        v-model="formData.weight" 
                        required 
                        placeholder="Please Insert Book Weight"
                        @input="validateForm"
                    >
                </label>
                <p v-if="this.errors.weight" class="error">{{ this.errors.weight }}</p>
                <span class="product-desc">Please, provide weight in KG</span>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: "AddProduct",
    
    methods: {
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

        }
    },

    computed: {
        ...mapState(["errors", "products"]),
        formData: {
            get(){
                return this.$store.state.formData;
            },

            set(formData){
                this.$store.dispatch("setFormData", formData)
            }
        },

    }


}

</script>

<style scoped lang="scss">

#product-form{
    width: 500px;
    margin-top: 30px;
    text-align: left;

    .input-div{
        margin-bottom: 20px;

        label{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        span{
            flex: 1;
        }
        input, select{
            margin-left: 20px;
            height: 25px;
            flex: 3.5;
            margin-left: 20px;
        }

        // input:invalid {
        //     border: 1px solid red;
        // }

        
    }

    .product-desc{
            margin-left: 25%;
        }

}

.error{
    color: #ff0000;
    margin-left: 25%;
}

</style>