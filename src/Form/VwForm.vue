<template>
  <div class="uk-padding-large">
    <h3 class="uk-h3" v-text="formData.title"></h3>
    <p v-text="status"></p>
    <form
      @submit.prevent="$emit('process-form', userData)"
      class="uk-grid uk-form-stacked"
      novalidate
    >
      <div
        v-for="field in formData.properties"
        :key="field.id"
        class="uk-width-1-1"
      >
        <form-field-password
          v-if="'password' === field.type"
          :field="field"
          v-on:input="handleChange"
        />

        <form-field-text-area
          v-else-if="'textarea' === field.type"
          :field="field"
          v-on:input="handleChange"
        />

        <form-field v-else :field="field" v-on:input="handleChange" />
      </div>

      <div class="uk-width-1-1">
        <input
          type="submit"
          value="Submit"
          class="uk-button uk-button-default"
          :disabled="isDisabled"
        />
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash';

import FormField from './FormField';
import FormFieldPassword from './FormFieldPassword';
import FormFieldTextArea from './FormFieldTextArea';

export default {
  components: {
    FormFieldTextArea,
    FormField,
    FormFieldPassword,
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      status: '',
      userData: {},
      isDisabled: true,
      requiredFields: {},
    };
  },
  mounted() {
    const requiredFields = _.filter(this.formData.properties, 'required');
    for (let i = 0, m = requiredFields.length; i < m; i++) {
      this.requiredFields[requiredFields[i].id] = {
        valid: false,
      };
    }
  },
  methods: {
    handleChange(payload) {
      this.$set(this.userData, payload.id, payload.value);
      this.requiredFields[payload.id].valid = payload.valid;

      this.isDisabled = _.findKey(this.requiredFields, ['valid', false]);
    },
  },
};
</script>
