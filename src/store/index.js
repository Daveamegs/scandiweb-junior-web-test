import axios from 'axios';
import { createStore } from 'vuex';
import router from '@/router';

export default createStore({
  // STATE
  state: {
    products: [],
    formData: {
      SKU: "",
      name: "",
      price: "",
      productType: "",
      size: "",
      weight: "",
      width: "",
      height: "",
      length: ""
    },
    selectedProducts: [],
    errors: {}
  },

  // GETTERS
  getters: {
    isSelected: (state) => (productID) => {
      return state.selectedProducts.includes(productID)
    },

    selectedProducts: (state) => {
      return state.selectedProducts
    }
  },

  // MUTATIONS
  mutations: {
    getAllProducts(state, products){
      state.products = products;
    },

    addProduct(state, product){
      state.products.push(product);
    },

    setFormData(state, formData){
      state.formData = formData;
    },

    setSelectedProducts(state, productID){
      if(!state.selectedProducts.includes(productID));
      state.selectedProducts.push(productID);
    },

    removeSelectedProducts(state, productID){
      const index = state.selectedProducts.indexOf(productID);
      if(index !== -1){
        state.selectedProducts.splice(index, 1);
      }
    },

    deleteProducts(state){
      state.selectedProducts = [];
    },

    setErrors(state, errors){
      state.errors = errors;
    },

    cancel(state){
      state.formData = {
        productType: ""
      }
      state.errors = {
        
      }
    }

  },

  // ACTIONS
  actions: {
    getAllProducts({commit}){
      axios.get("http://localhost:80/scandiweb/public/index.php")
        .then((response) => {
          commit("getAllProducts", response.data);
        })
    },

    addProduct({commit, state}, product) {
      axios.post("http://localhost:80/scandiweb/public/index.php", product, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
          commit("addProduct", response.data);
          if(response.data.success === true){
            state.formData = { productType: ""};
            state.errors = {};
            router.push("/");
          } else{
            console.log(response.data.message);
          }
      })
      .catch(error => {
        console.log(error);
      });
    },

    setFormData({commit}, formData){
      commit("setFormData", formData)
    },

    deleteProducts({commit, state}){
      state.selectedProducts.forEach(productID => {
        axios.delete(`http://localhost/scandiweb/public/index.php?id=${productID}`, {
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            commit("deleteProducts")

            if (response.data.success === true){
              location.reload()
            }
            
          })
          .catch(error => {
            console.log(error);
          })
      });
    },

    setErrors({commit}, errors){
      commit("setErrors", errors)
    },

    cancel({commit}){
      commit("cancel")
    }
  },
  
  modules: {

  }
})
