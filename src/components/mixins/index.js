const formValidation = {
  computed: {
    /**
     *  Maps array of fields to object of values
     *  Element UI validation expects to use v-model binding
     *  This allows getters from Vuex to be mapped to values in formData object
     *
     *  requires an array of gettersToValidate on component
     *  @return  Object  { field: this.field }
     */
    formData() {
      if (!this.gettersToValidate) {
        return;
      }
      const result = {};
      this.gettersToValidate.forEach(field => {
        result[field] = this[field];
      });

      return result;
    },
  },
};

export { formValidation };
